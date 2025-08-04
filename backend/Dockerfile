# 1. เลือก Base Image
FROM node:18-alpine

# 2. ตั้งค่า Working Directory หลักใน container
WORKDIR /app

# 3. คัดลอกไฟล์ .env จากโฟลเดอร์แม่ (../) เข้าไปไว้ที่ /app
COPY ../.env .

# # 4. สร้างและเข้าไปยัง Working Directory ของ backend
WORKDIR /app/backend

# 7. คัดลอกซอร์สโค้ดที่เหลือทั้งหมดจากโฟลเดอร์ปัจจุบัน (backend) เข้าไป
COPY ./backend /app/backend/
# 5. คัดลอก package.json และ package-lock.json จากโฟลเดอร์ปัจจุบัน (backend)

# 6. ติดตั้ง Dependencies
RUN npm install 


# 8. บอก Port ที่จะใช้
EXPOSE 3001

# 9. คำสั่งสำหรับรันเซิร์ฟเวอร์
#CMD ["node", "server.js"]
CMD ["node", "server.js"]