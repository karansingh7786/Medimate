from fastapi import APIRouter
from ai.chatbot import chatbot_reply

router = APIRouter(
    prefix="/ai",
    tags=["AI Chatbot"]
)

@router.post("/chat")
def chat_api(data: dict):
    user_message = data.get("message", "")
    response = chatbot_reply(user_message)
    return {"reply": response}
