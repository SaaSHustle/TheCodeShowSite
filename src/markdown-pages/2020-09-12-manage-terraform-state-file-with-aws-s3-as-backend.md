---
title: Manage Terraform State File with AWS s3 as backend
date: "2020-09-12"
thumbnail: "../thumbnails/terraform.png"
subject: Terraform
topic: Terraform State File
topicIndex: 1
keywords:
  - Terraform AWS S3
  - Terraform State File    
slug: Manage-Terraform-State-File-with-AWS-s3-as-backend
---

##### Points to discuss: 

- What is Terraform ?
- What is Terraform State File?
- Ways to manage state file.
- Managing terraform state file with AWS S3



## What is Terraform?


`Wikipedia:` Terraform is an open-source infrastructure as code software tool created by HashiCorp. Users define and provision data center infrastructure using a declarative configuration language known as HashiCorp Configuration Language (HCL), or optionally JSON

`Terraform Official Site:`  “Use Infrastructure as Code to provision and manage any cloud, infrastructure, or service”

It's pretty clear from the above statement that you can write or express your infrastructure as code. You can define the infrastructure as code to create new resources, manage and destroy existing resources. It enables collaboration and share configurations to evolve and provision infrastructure. it allows us to see infrastructure that is going to be created before actually creating it using `terraform plan`.  

Since we can define infrastructure as code it enables us to recreate or reproduce the infrastructure for production or staging etc very easily. 


With terraform we can write infrastructure using a high level configuration language called HCL (Hashicorp Configuration Language). After writing our infrastructure with HCL we can see which resources are going to be created using `terraform plan` command, it will show resources that are going to be created, changed or destroyed after you run `terraform apply` command. After verifying the changes that are going to be made you just need to run `terraform apply` command to provision the infrastructure. 

If you are planning to deploy your infrastructure then you should definitely look into terraform. Currently it is one of the most popular infrastructure automation tool. It supports multiple cloud providers like aws, azure , google cloud platform etc. You can find the full list [here](https://www.terraform.io/docs/providers/index.html#lists-of-terraform-providers) 


## What is terraform State File (terraform.tfstate)?

Terraform state file contains information about the infrastructure provisioned in the past from Terraform tool. This contains information about what are the resources configured and their configurations details. It enables terraform automation tools to sync up what is already configured and what changes are going to happen with future configuration changes.
 
 When we hit `terraform plan` command terraform uses a state file to compare the changes to let us know which resources are going to be `created`, `changed` or `destroyed`. 
 
 If you have not maintained the state file after you have deployed the infrastructure there is no way for terraform to know which resources to update or delete in next time when you make changes to your infrastructure configurations. So it is necessary to manage this file to leverage the benefit of terraform automation tool. This state is stored by default in a local file named `terraform.tfstate`, but it can also be stored remotely, which works better in a team environment. You can read more about the purpose of terraform state file here https://www.terraform.io/docs/state/purpose.html


## Ways to manage terraform file.

2 ways:

- Locally
- Remotely


By default terraform creates terraform.tfstate file locally when you run terraforms cli commands. It is ok when you are working individually on your POC projects. But there is fear of losing this file when stored locally with accidentally deleting it or storage failures or any other case. Storing this file locally will not be helpful if you work within a team. So it's  better to store it remotely in the cloud. Storing state files in the cloud comes with new challenges like locking when multiple members of a team are accessing it at the same time and versioning it.



## Managing terraform state file in AWS S3

Now let's see how we can store our terraform.tfstate file in s3. Below are the two things we need to take care.

- Versioning
- Acquire & Release Lock

With AWS s3 it is very easy to enable versioning of state file. Now to enable only single infrastructure changes at a time we need to acquire lock before making the change and then we need to release that lock to enable other developers to make infrastructure changes using terraform. For locking purposes we are going to use AWS dynamo DB. 

##Follow below steps to create resources to manage state file:

- #### Create S3 bucket and Dynamodb table

```hcl
# Configure the AWS Provider
provider "aws" {
 version = "~> 2.0"
 region  = var.aws_region
}

resource "aws_s3_bucket" "terraform_state" {
 bucket = "terraform-state-file-up-and-running-prod"
 # Enable versioning so we can see the full revision history of our
 # state files
 versioning {
   enabled = true
 }
 # Enable server-side encryption by default
 server_side_encryption_configuration {
   rule {
     apply_server_side_encryption_by_default {
       sse_algorithm = "AES256"
     }
   }
 }
}


resource "aws_dynamodb_table" "terraform_locks" {
 name         = "terraform-up-and-running-locks"
 billing_mode = "PAY_PER_REQUEST"
 hash_key     = "LockID"
 attribute {
   name = "LockID"
   type = "S"
 }
}
```

Install terraform cli on local machine. In your project folder create a main.tf file and add above terraform code. Open command line in the same folder and hit `terraform plan`. It will show you all resources going to be added, changed or created. After seeing the plan hit `terraform apply` command to apply the changes. After resources are created successfully you can move on to next step.


- #### Add s3 as terraform backend

Till now you have created one s3 bucket and one dynamo db. You also had one terraform.tfstate file created. Now add below code to your main.tf file. 
```hcl
terraform {
 backend "s3" {
   # Replace this with your bucket name!
   bucket         = "terraform-state-file-up-and-running-prod"
   key            = "global/s3/terraform.tfstate"
   region         = "ap-south-1"
   # Replace this with your DynamoDB table name!
   dynamodb_table = "terraform-up-and-running-locks"
   encrypt        = true
 }
}
```

Here we are setting s3 as our terraform backend. We provided a bucket name, key, region, dynamodb_table we created earlier. Now if you run terraform init command it will recognize the previously created terraform.tfstate file. Now run `terraform apply`. After successful command execution go to s3 on aws console. You will find a state file there in your bucket. 

Now if you add new resources and run `terraform plan` or `terraform apply` command terraform will first download the state file from s3 and use that while comparing with your code changes to see what to create and destroy. It also acquires lock in the dynamo table.  After complete execution of the terraform command you ran terraform will automatically upload the updated terraform state file to the aws s3 bucket and release the lock.


That’s it. Now you have successfully created aws s3 backend to manage the state file. 
