import operator
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_core.messages import AnyMessage, HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from services.retriever import retrieve_context
from core.config import settings

class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], operator.add]
    context: list[dict]

def retrieve_node(state: AgentState):
    messages = state["messages"]
    last_user_message = next((m.content for m in reversed(messages) if isinstance(m, HumanMessage)), "")
    
    if last_user_message:
        context_docs = retrieve_context(last_user_message, top_k=5)
        return {"context": context_docs}
    return {"context": []}

def generate_node(state: AgentState):
    if not settings.GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not set.")
        
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=settings.GEMINI_API_KEY)
    
    context_str = "\n\n".join(
        [f"[Source: {doc['source']}]\n{doc['text']}" for doc in state.get("context", [])]
    )
    
    system_prompt = f"""You are Kognite, an advanced AI research assistant.
Answer the user's question based ONLY on the following context.
If the answer is not in the context, say "I don't have enough information from the provided sources to answer this."
Always cite the source inline when making a claim (e.g., [Source: https://...]).

Context:
{context_str}
"""
    
    new_messages = [SystemMessage(content=system_prompt)] + state["messages"]
    
    response = llm.invoke(new_messages)
    # The operator.add will append this response to the messages list
    return {"messages": [response]}

workflow = StateGraph(AgentState)
workflow.add_node("retrieve", retrieve_node)
workflow.add_node("generate", generate_node)

workflow.add_edge(START, "retrieve")
workflow.add_edge("retrieve", "generate")
workflow.add_edge("generate", END)

agent_app = workflow.compile()
