FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} ms-status-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/ms-status-0.0.1-SNAPSHOT.jar"]