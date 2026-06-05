from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain_core.messages import HumanMessage, AIMessage
from services.agent import agent_app

router = APIRouter(prefix="/api/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = [] # [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]

@router.post("/")
async def chat_endpoint(req: ChatRequest):
    try:
        # Reconstruct LangChain message history
        messages = []
        for msg in req.history:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                messages.append(AIMessage(content=msg["content"]))
        
        # Add the current user message
        messages.append(HumanMessage(content=req.message))
        
        # Invoke agent
        final_state = agent_app.invoke({"messages": messages})
        
        # The last message in the state is the AI's response
        last_message = final_state["messages"][-1]
        
        # Deduplicate sources for the response metadata
        sources = list(set([doc["source"] for doc in final_state.get("context", [])]))
        
        return {
            "response": last_message.content,
            "sources": sources
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
