import requests
from bs4 import BeautifulSoup

def crawl_website(url: str) -> str:
    try:
        # Prevent hanging requests
        response = requests.get(url, timeout=10, headers={'User-Agent': 'KogniteBot/1.0'})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Remove script, style, header, footer, and navigation elements
        for element in soup(["script", "style", "header", "footer", "nav", "noscript"]):
            element.decompose()
            
        text = soup.get_text(separator=' ')
        # Clean up whitespace
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = '\n'.join(chunk for chunk in chunks if chunk)
        
        return text
    except Exception as e:
        raise ValueError(f"Could not crawl website: {str(e)}")
