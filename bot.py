import asyncio
import logging
from aiogram import Bot, Dispatcher, F
from aiogram.types import Message
from aiogram.filters import Command



# توکن ربات خود را اینجا قرار دهید
API_TOKEN = "8866921208:AAEhz1Y7effw95qTxqCWOgxhrx13mhbe6KY"


# تنظیمات لاگ برای دیدن خروجی در ترمینال
logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher()


# این هندلر پیام‌هایی را که حاوی فایل صوتی هستند می‌گیرد
@dp.message(F.audio)
async def get_file_id(message: Message):
    # استخراج file_id از آبجکت audio
    file_id = message.audio.file_id
    
    # چاپ در ترمینال
    print("-" * 30)
    print(f"File Name: {message.audio.file_name}")
    print(f"File ID: {file_id}")
    print("-" * 30)
    
    # پاسخ به کاربر برای اطلاع از اینکه فایل دریافت شد
    await message.reply(f"فایل دریافت شد!\n`{file_id}`", parse_mode="Markdown")

async def main():
    print("Bot is running...")
    await dp.start_polling(bot)



if __name__ == "__main__":
    asyncio.run(main())
