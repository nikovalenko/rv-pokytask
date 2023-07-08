# Define provider
provider "aws" {
  access_key = "YOUR_AWS_ACCESS_KEY"
  secret_access_key = "YOUR_AWS_SECRET_ACCESS_KEY"
  region = "us-west-2"  # Replace with your desired AWS region
}

# Create security group allowing inbound access to ports
resource "aws_security_group" "docker_sg" {
  name        = "docker-sg"
  description = "Allow inbound access to Docker containers"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Add any additional ports you may need

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create an ECS cluster
resource "aws_ecs_cluster" "docker_cluster" {
  name = "docker-cluster"
}

# Create a task definition for React service
resource "aws_ecs_task_definition" "react_task" {
  family                = "react-task"
  container_definitions = <<DEFINITION
[
  {
    "name": "react-container",
    "image": "your-react-image-url",
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 80,
        "protocol": "tcp"
      }
    ],
    "essential": true
  }
]
DEFINITION
}

# Create a service for React
resource "aws_ecs_service" "react_service" {
  name            = "react-service"
  cluster         = aws_ecs_cluster.docker_cluster.id
  task_definition = aws_ecs_task_definition.react_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    security_groups = [aws_security_group.docker_sg.id]
    subnets         = ["YOUR_SUBNET_ID"]  # Replace with your subnet ID(s)
  }
}

# Create a task definition for Express REST service
resource "aws_ecs_task_definition" "express_task" {
  family                = "express-task"
  container_definitions = <<DEFINITION
[
  {
    "name": "express-container",
    "image": "your-express-image-url",
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 80,
        "protocol": "tcp"
      }
    ],
    "essential": true
  }
]
DEFINITION
}

# Create a service for Express REST
resource "aws_ecs_service" "express_service" {
  name            = "express-service"
  cluster         = aws_ecs_cluster.docker_cluster.id
  task_definition = aws_ecs_task_definition.express_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    security_groups = [aws_security_group.docker_sg.id]
    subnets         = ["YOUR_SUBNET_ID"]  # Replace with your subnet ID(s)
  }
}

# Create a task definition for MongoDB service
resource "aws_ecs_task_definition" "mongo_task" {
  family                = "mongo-task"
  container_definitions = <<DEFINITION
[
  {
    "name": "mongo-container",
    "image": "your-mongo-image-url",
    "portMappings": [
      {
        "containerPort": 27017,
        "hostPort": 27017,
        "protocol": "tcp"
      }
    ],
    "essential": true
  }
]
DEFINITION
}

# Create a service for MongoDB
resource "aws_ecs_service" "mongo_service" {
  name            = "mongo-service"
  cluster         = aws_ecs_cluster.docker_cluster.id
  task_definition = aws_ecs_task_definition.mongo_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    security_groups = [aws_security_group.docker_sg.id]
    subnets         = ["YOUR_SUBNET_ID"]  # Replace with your subnet ID(s)
  }
}
