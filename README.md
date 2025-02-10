# **Learning Management Platform**

🚀 A **full-stack** Learning Management Platform built with **Next.js, Node.js, and TypeScript**, designed for seamless online education. The platform utilizes **AWS Lambda** for serverless functions, **Amazon S3** for file storage, and **Docker with ECR** for containerization and deployment.

## **📌 Features**
- 📚 **User-friendly** online course management system.
- 🔑 **Authentication** powered by Clerk.
- ☁️ **AWS Services**: Lambda for serverless execution, S3 for media storage.
- 🐳 **Dockerized Deployment** via AWS **ECR**.
- ⚡ **Real-time Updates** for a smooth user experience.
- 💳 **Stripe Integration** for secure payments.

---

## **🛠 Tech Stack**
- **Frontend**: Next.js (React), TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Clerk
- **Storage**: AWS S3
- **Containerization**: Docker, AWS ECR
- **Deployment**: AWS Lambda

---

## **🚀 Getting Started**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/MohammedAyaz922/Learning-management-app.git
cd Learning-management-app

2️⃣ Install Dependencies
npm install --legacy-peer-deps

3️⃣ Set Up Environment Variables
Create a .env.local file in the root directory and configure the following:

NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-api-key
MONGO_URL=your-mongodb-connection-string
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
STRIPE_SECRET_KEY=your-stripe-key

4️⃣ Run the Development Server
npm run dev

 Deployment Instructions
The application is containerized using Docker and deployed via AWS Lambda & AWS ECR.

🛠 Building & Pushing Docker Image

docker build -t learning-management-app .
docker tag learning-management-app:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/learning-management-app
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/learning-management-app

🚀 Deploying to AWS Lambda
Use AWS Lambda’s container image support.
Select ECR Image as the deployment source.
Set the necessary environment variables.
Configure API Gateway for routing.
