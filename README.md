# Data Integration Test Project

## Objective
Create a project that can parse the provided CSV files and convert them into the provided JSON
format to be submitted to an API endpoint so that they could be ingested into a data platform.

## Input Format
The input files are CSV formatted with slightly different column formats and contain missing
entries which should be converted to null values. File names follow the format of
"Date-FileName.csv"

## Output Format
The program should call a REST endpoint ingestionendpoint:8080/ftp with data from each row
of the CSV file formatted in the following data format:
```
{
    "id": "<<filename>>",
    "received": "<<timestamp ISO8601 format>>",
    "payload": {
        …<<key - values>>…
    }
}
```
## Proposed Solution
To keep it simple, the files to be processed are stored within the app in the "Files" folder. Hosted files are filtered to rule out any non-csv files and processed to convert to the requested format. As they are processed it is sent to the provided endpoint (it can be changed as an environment variable when building the image, it is declared in the Dockerfile as API_URL).

A small restapi server is available to test the app and be the "reception of the data sent by the parser app".

<p align="center">
     <img src="https://github.com/chewydc/DataIntegrationTestProject/blob/64fe21260c50883689e9446982b14dd93beb5a85/Flow.PNG">
</p>

## Instruction for running the project as Docker containers
We can test it by running both applications, Parser_App and Test_Api_Server, in docker containers. The following instructions will help you achieve this. You can choose the names and labels that best suit your needs, but it is important for this test scenario to respect the combination of the name of the Test_Api_Server container with the endpoint called by the Parser_App (both the API server and the Parser_App are in the same bridge network defined by the user, which allows it to be addressed by its name or alias). If this match is not respected, the requests generated by the application will fail.

1. Clone the repository
```
git clone https://github.com/chewydc/DataIntegrationTestProject.git
cd DataIntegrationTestProject
```
2. Build the parser app image
```
cd Parser_App
docker build -t parser-app-img:latest . 
cd ..
```
3. Build the test server image (optional) 
```
cd Test_Api_Server
docker build -t restapi-img:latest .  
```
4. RUN the entire project
```
docker network create my-network
docker run -d --name ingestionendpoint --net my-network -p 8080:8080 restapi-img:latest
docker run -d --name parserapp --net my-network parser-app-img:latest

```
5. Check the result

At this point, you should see the incoming data printed in the console of the "ingestionendpoint" container

<p align="center">
     <img src="https://github.com/chewydc/DataIntegrationTestProject/blob/64fe21260c50883689e9446982b14dd93beb5a85/ResultExample.PNG">
</p>
