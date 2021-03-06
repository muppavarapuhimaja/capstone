# Cloud Connectivity Self Assessment Tool

### 1. Technical Requirements

##### 1.1 Minimum Server Requirements	
 - OS: Linux Ubuntu 64-bit 16.04 LTS or above
 - RAM: 4GB
 - HDD/SSD: 10GB 

##### 1.2 Tool Requirements
 - Maven v3.3+
 - Tomcat 9.0 - Servlet version 4.0
 - JAVA Open JDK version v11+
 - Yarn v1.22.5
 - Node v6.2.2+
 - NPM 
 - Git
 - MySQL v8.0
 - SMTP Email Server
 - Nginx Server

##### 1.3 Programming Languages
 - Frontend: JavaScript
 - Backend: JAVA

##### 1.4 Frameworks
 - Frontend Frameworks: React.js/Redux, Material UI (CSS Framework), React Bootstrap (CSS Framework).
 - Backend Framework: Spring boot 2.0

##### 1.5 Database
 - MySQL
 
### 2. Building and Running Backend Module in Production environment (Spring Boot application).

 1. Pull the source code from the appropriate repository.
 
 2. The code root directory must contain below files and directories.
    ```
       [root@ip-192-168-1-37 backend]# ls -lhr
       total 54M
       drwxr-xr-x 8 root root  217 Nov 11 00:05 target
       drwxr-xr-x 4 root root   30 Nov  4 06:33 src
       -rw-r--r-- 1 root root  100 Nov  4 06:33 README.md
       -rw-r--r-- 1 root root 5.7K Nov  4 06:33 pom.xml
       -rw-r--r-- 1 root root 6.5K Nov  4 06:33 mvnw.cmd
       -rwxr-xr-x 1 root root 9.9K Nov  4 06:33 mvnw
       drwxr-xr-x 3 root root   56 Nov 12 21:19 logs
       -rw-r--r-- 1 root root 1.1K Nov  4 06:33 LICENSE
       -rwxr-xr-x 1 root root  509 Nov  4 06:35 env_vars.sh
       -rwxr-xr-x 1 root root  298 Nov  4 06:34 env_vars_sample.sh
       -rw-r--r-- 1 root root  54M Nov 11 00:05 data-management-service.jar
       -rwxr-xr-x 1 root root 2.2K Nov  5 00:47 app_script.sh
    ```
    **Note**: **logs** and **target** directories are not the part of source code. **Logs** directory is generated by the
     application and **target** directory is generated while building the source code.
     
  3. Configure the environmental variables by copying env_vars_sample.sh to env_vars.sh.
     env_vars.sh will not be committed in the remote repository.
     ```
        [root@ip-192-168-1-37 backend]# cp env_vars_sample.sh env_vars.sh
        
        [root@ip-192-168-1-37 backend]# cat env_vars.sh 
        #!/bin/sh
        
        export DB_HOST=localhost
        export DB_PORT=3306
        export DB_SCHEMA=assessment_db
        export DB_USER=db_user
        export DB_PASS='dsfsdfsd'
        export EMAIL_HOST_USERNAME=sdfdsfds
        export EMAIL_HOST_PASSWORD=sdfdfdf
        export EMAIL_SEND_FROM=xyz@abc.com
        export JWT_SECRET_KEY='ewr@#sdfsd@423%nl'
        export PORT=8090
        export ACTIVE_PROFILE=<prod/dev> [Set this "prod" or "dev" based on environment]
        export CLIENT_URL=http://localhost:7000
        export ADMIN_USERNAME=xyz
        export ADMIN_PASSWORD=xyz
     ```
     Assign all the values to env variables.
     
  4. Build the source code using the build script. Below commands shows the usage of the build script.
     ```
        [root@ip-192-168-1-37 backend]# ./app_script.sh 
        
        app_script.sh: usage: [-start] | [-stop] | [-restart] | [-status] | [-build] | [-h]
        
        [root@ip-192-168-1-37 backend]# ./app_script.sh -h
        
        app_script.sh: usage: [-start] | [-stop] | [-restart] | [-status] | [-build] | [-h]
        
        	-start: restart the backend application on port 8090.
        	-stop: stop the application
        	-status: status of the application
        	-build: build application
        	-h: info to run the application
        
        [root@ip-192-168-1-37 backend]# ./app_script.sh -build
        [INFO] Scanning for projects...
        [INFO] 
        [INFO] ------------< com.self-assessment:data-management-service >-------------
        [INFO] Building data-management-service 0.0.1-SNAPSHOT
        [INFO] --------------------------------[ jar ]---------------------------------
        [INFO] 
        [INFO] --- maven-resources-plugin:3.1.0:resources (default-resources) @ data-management-service ---
        [INFO] Using 'UTF-8' encoding to copy filtered resources.
        [INFO] Copying 3 resources
        [INFO] Copying 5 resources
        [INFO] 
        [INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ data-management-service ---
        [INFO] Nothing to compile - all classes are up to date
        [INFO] 
        [INFO] --- maven-resources-plugin:3.1.0:testResources (default-testResources) @ data-management-service ---
        [INFO] Using 'UTF-8' encoding to copy filtered resources.
        [INFO] skip non existing resourceDirectory /home/ec2-user/backend/src/test/resources
        [INFO] 
        [INFO] --- maven-compiler-plugin:3.8.1:testCompile (default-testCompile) @ data-management-service ---
        [INFO] Nothing to compile - all classes are up to date
        [INFO] 
        [INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ data-management-service ---
        [INFO] Tests are skipped.
        [INFO] 
        [INFO] --- maven-jar-plugin:3.2.0:jar (default-jar) @ data-management-service ---
        [INFO] Building jar: /home/ec2-user/backend/target/data-management-service.jar
        [INFO] 
        [INFO] --- spring-boot-maven-plugin:2.3.0.RELEASE:repackage (repackage) @ data-management-service ---
        [INFO] Replacing main artifact with repackaged archive
        [INFO] 
        [INFO] --- maven-install-plugin:2.5.2:install (default-install) @ data-management-service ---
        [INFO] Installing /home/ec2-user/backend/target/data-management-service.jar to /root/.m2/repository/com/self-assessment/data-management-service/0.0.1-SNAPSHOT/data-management-service-0.0.1-SNAPSHOT.jar
        [INFO] Installing /home/ec2-user/backend/pom.xml to /root/.m2/repository/com/self-assessment/data-management-service/0.0.1-SNAPSHOT/data-management-service-0.0.1-SNAPSHOT.pom
        [INFO] ------------------------------------------------------------------------
        [INFO] BUILD SUCCESS
        [INFO] ------------------------------------------------------------------------
        [INFO] Total time:  4.846 s
        [INFO] Finished at: 2020-11-13T19:42:55Z
        [INFO] ------------------------------------------------------------------------
        Logs: New jar file generated /home/ec2-user/backend/data-management-service.jar ....

     ```
     Currently, the backend module application uses port 8090. In case you are changing the port than you need to change the
     port in app_script.sh. Change the below port 8090 to newly assigned port.
     ```
        BACKEND_PROCESS_ID=`lsof -o | grep ':8090' | awk -F ' ' '{print $2}' | head -1`
     ```
     
  5. Start the application. "-start" option will stop the existing application running on port 8090 and starts the new application.
     ```
        [root@ip-192-168-1-37 backend]# ./app_script.sh -start
         Logs: Backend process is found with process id 29852....
         Logs: Backend application process is stop successfully....
         Logs: Backend application started successfully on port 8090....
        [root@ip-192-168-1-37 backend]# 
     ```
     Similarly, if you just wants to stop application. You can use "-stop" option.
     ```
        [root@ip-192-168-1-37 backend]# ./app_script.sh -stop
         Logs: Backend process is found with process id 19993....
         Logs: Backend application process is stop successfully....
     ```
     
  6. Check the status of the application after 10 seconds. If all went fine then you will get the process id. If failed then process id won't be generated. 
     ```
        root@ip-192-168-1-37 backend]# ./app_script.sh -status
        Logs: Backend application process is running on port 8090 with process id 20383....
     ```
     
  7. If the application doesn't start or is crashed. Then check the logs.
     ```
        root@ip-192-168-1-37 logs]# pwd
        /home/ec2-user/backend/logs
        root@ip-192-168-1-37 logs]# tail self-assessment-logger.log 
        2020-11-13 19:51:08,761 INFO org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator [task-1] HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
        2020-11-13 19:51:08,771 INFO org.springframework.orm.jpa.AbstractEntityManagerFactoryBean [task-1] Initialized JPA EntityManagerFactory for persistence unit 'default'
        2020-11-13 19:51:09,210 INFO org.springframework.boot.actuate.endpoint.web.EndpointLinksResolver [main] Exposing 2 endpoint(s) beneath base path '/actuator'
        2020-11-13 19:51:09,458 INFO org.springframework.security.web.DefaultSecurityFilterChain [main] Creating filter chain: any request, [org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@10cd6753, org.springframework.security.web.context.SecurityContextPersistenceFilter@3efedc6f, org.springframework.security.web.header.HeaderWriterFilter@64524dd, org.springframework.web.filter.CorsFilter@71ad3d8a, org.springframework.security.web.authentication.logout.LogoutFilter@38fc5554, com.selfassessment.datamanagementservice.filter.JwtRequestFilter@4593ff34, org.springframework.security.web.savedrequest.RequestCacheAwareFilter@6c42f2a1, org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@1aa6e3c0, org.springframework.security.web.authentication.AnonymousAuthenticationFilter@47af099e, org.springframework.security.web.session.SessionManagementFilter@74dbb1ee, org.springframework.security.web.access.ExceptionTranslationFilter@74294c1a, org.springframework.security.web.access.intercept.FilterSecurityInterceptor@d8d9199]
        2020-11-13 19:51:09,955 INFO org.apache.juli.logging.DirectJDKLog [main] Starting ProtocolHandler ["http-nio-8090"]
        2020-11-13 19:51:09,976 INFO org.springframework.boot.web.embedded.tomcat.TomcatWebServer [main] Tomcat started on port(s): 8090 (http) with context path ''
        2020-11-13 19:51:10,691 INFO org.springframework.data.repository.config.DeferredRepositoryInitializationListener [main] Triggering deferred initialization of Spring Data repositories???
        2020-11-13 19:51:11,154 INFO org.springframework.data.repository.config.DeferredRepositoryInitializationListener [main] Spring Data repositories initialized!
        2020-11-13 19:51:11,171 INFO org.springframework.boot.StartupInfoLogger [main] Started DataManagementServiceApplication in 10.445 seconds (JVM running for 11.111)
        2020-11-13 19:51:11,327 INFO com.selfassessment.datamanagementservice.controllers.AuthenticationController [main] Admin password updated
     ```
     **Note**: This logs has the rollover policy and stores max upto 2GB of Log data. You can change the policy by modifying below file.
     ```
        [root@ip-192-168-1-37 resources]# pwd
        /home/ec2-user/backend/src/main/resources
        [root@ip-192-168-1-37 resources]# vi logback-spring.xml 
     ```
     
### 3. Building and Running Frontend Module in Production environment (React application).

  1. (**Optional Step**) In case if the code is deployed to another production server, then make sure the Nginx
     is installed in order to run the React.js application. Add the below Nginx config in /etc/nginx/nginx.conf file.
    
        ```
            server {
                    listen       8080 default_server;
                    listen       [::]:8080 default_server;
                    server_name  localhost;
                  
                    location / {
                            root /var/www/react-app/build;
                            index index.html index.htm;
            
                            try_files $uri /index.html;
                    }
                }
        ```

 2. Pull the source code from the appropriate repository.
 
 3. The code root directory must contain below files and directories.
    ```
       [root@ip-192-168-1-37 frontend]# ls -alhr
       total 1.2M
       -rw-r--r--    1 root     root     513K Nov 13 17:31 yarn.lock
       drwxr-xr-x   11 root     root      189 Nov  8 20:13 src
       -rw-r--r--    1 root     root     2.9K Nov  4 06:43 README.md
       drwxr-xr-x    2 root     root      157 Nov  4 06:43 public
       -rw-r--r--    1 root     root     616K Nov  4 06:43 package-lock.json
       -rw-r--r--    1 root     root     1.6K Nov  8 20:13 package.json
       drwxr-xr-x 1108 root     root      32K Nov  8 20:13 node_modules
       -rw-r--r--    1 root     root      322 Nov  4 06:43 .gitignore
       drwxr-xr-x    8 root     root      220 Nov 13 17:31 .git
       -rw-r--r--    1 root     root       41 Nov  4 06:47 .env_sample
       -rw-r--r--    1 root     root       73 Nov  4 06:46 .env
       drwxr-xr-x    3 root     root      284 Nov 13 17:32 build
       -rwxr-xr-x    1 root     root      974 Nov  4 07:00 app_script.sh
    ```
    **Note**: **build** directory is generated while building the source code.
     
  4. Configure the environmental variables by copying .env_sample to .env.
     .env must not be committed in the remote repository.
     ```
        [root@ip-192-168-1-37 backend]# cp .env_sample .env
        
        [root@ip-192-168-1-37 frontend]# cat .env_sample 
        REACT_APP_SERVER_URL=<Server URL>
        REACT_APP_PROFILE=<dev/prod> [Set this "prod" or "dev" based on environment]
     ```
     Assign all the values to env variables.
     
  5. Build script usage. Below commands shows the usage of the build script.
     ```
        [root@ip-192-168-1-37 frontend]# ./app_script.sh 
        
        app_script.sh: usage: [-build] | [-clean_build] | [-h]
        
        [root@ip-192-168-1-37 frontend]# ./app_script.sh -h
        
        app_script.sh: usage: [-build] | [-clean_build] | [-h]
        
            -build: build the package with existing node_modules packages.
            -clean_build: Remove all the generated packages and build.
            -h: info to run the application                
     ```
     Currently, the frontend module application uses port 8080. In case you are changing the port than you need to change the
     port in Nginx config file which is mentioned in Step 1.   
     
  5. Build and Run the application. "-build" option will build the application and copies the build directory to the path mention
     in the Nginx config file i.e. /var/www/react-app/build 
     ```
        [root@ip-192-168-1-37 frontend]# ./app_script.sh -build
        yarn install v1.22.10
        warning package-lock.json found. Your project contains lock files generated by tools other than Yarn. It is advised not to mix package managers in order to avoid resolution inconsistencies caused by unsynchronized lock files. To clear this warning, remove package-lock.json.
        [1/4] Resolving packages...
        success Already up-to-date.
        Done in 0.95s.
        
        > self-assessment-website@0.1.0 build /home/ec2-user/frontend
        > env-cmd -f .env react-scripts build
        
        Creating an optimized production build...
        Compiled successfully.
        
        File sizes after gzip:
        
          996.57 KB  build/static/js/2.b75257f9.chunk.js
          28.42 KB   build/static/js/main.ca90184a.chunk.js
          22.49 KB   build/static/css/2.dec86d71.chunk.css
          787 B      build/static/js/runtime-main.2f9b7f5b.js
          538 B      build/static/css/main.274cb277.chunk.css
        
        The project was built assuming it is hosted at /.
        You can control this with the homepage field in your package.json.
        
        The build folder is ready to be deployed.
        You may serve it with a static server:
        
          yarn global add serve
          serve -s build
        
        Find out more about deployment here:
        
          bit.ly/CRA-deploy
        
        Logs: New build is generated and deployed at /var/www/react-app/build.... 
     ```
     Similarly, if you just wants to stop application. You can use "-stop" option.
     ```
        [root@ip-192-168-1-37 backend]# ./app_script.sh -stop
         Logs: Backend process is found with process id 19993....
         Logs: Backend application process is stop successfully....
     ```
     
  6. In case the build is failed. Then use "-clean_build" option. Usually this is needed whenever someone
     adds new library in package.json file. Clean build removes all the libraries from node_modules and yarn.lock
     and download again fresh ones.
     ```
        root@ip-192-168-1-37 backend]# ./app_script.sh -clean_build             
     ```
     Once you do clean build. Remember to commit yarn.lock file in Git.
     Otherwise, you need to repeat this step again, if you are trying to 
     build on other machine/path.

### 4. Building and Running Backend Module in Development environment (Spring Boot application).
	
  1. Pull the source code from the appropriate repository.

  2. Download Eclipse/intelliJ and import the project

  3. Set up your MySQL database account and add the account details in step 4 in order to configure the backend application with database.

  4. Configure the environmental variables in your IDE.       
     ```
        [root@ip-192-168-1-37 backend]# cp env_vars_sample.sh env_vars.sh
        
        [root@ip-192-168-1-37 backend]# cat env_vars.sh 
        #!/bin/sh
        
        export DB_HOST=localhost
        export DB_PORT=3306
        export DB_SCHEMA=assessment_db
        export DB_USER=db_user
        export DB_PASS='dsfsdfsd'
        export EMAIL_HOST_USERNAME=sdfdsfds
        export EMAIL_HOST_PASSWORD=sdfdfdf
        export EMAIL_SEND_FROM=xyz@abc.com
        export JWT_SECRET_KEY='ewr@#sdfsd@423%nl'
        export PORT=8090
        export ACTIVE_PROFILE=dev [Set this "prod" or "dev" based on environment]
        export CLIENT_URL=http://localhost:7000
        export ADMIN_USERNAME=xyz
        export ADMIN_PASSWORD=xyz
     ```
     Assign all the values to env variables.

  5. Run the app.
         
       ***NOTE***: In dev environemnt, for sending emails from user account, gmail configuration will be used. In production environemnt, Amazon's simple email service is used.
       To run Amazon's simple email service, your email id must be registered on Amazon AWS.

### 5. Building and Running Frontend Module in Development environment (React application).

   1. Pull the source code from the appropriate repository.

   2. Download Visual Studio/Webstorm and import the project

   3. Configure the environmental variables by copying .env_sample to .env.
      Note: your .env file must not be committed in the remote repository.
     
      ```
         REACT_APP_SERVER_URL=http://your-backend-server-ip-address:port
         REACT_APP_PROFILE=dev
      ```
      Assign all the values to env variables.
       
   4. Run the app.
         
       ***NOTE***: In dev environemnt, for sending emails from user account, gmail configuration will be used. In production environemnt, Amazon's simple email service is used.
       To run Amazon's simple email service, your email id must be registered on Amazon AWS.

   5. If you get below CORS error. Then see the Troubleshooting section.

      ```
         Access to XMLHttpRequest at 'http://54.203.176.192:8090/api/auth/verify' from
         origin 'http://localhost:7071' has been blocked by CORS policy: Response to preflight
         request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
      ```
     
### 6. Use Swagger (Spring Boot application).

 1. Swagger is always used in developer environment. In order to activate
    swagger you must set the env variable ACTIVE_PROFILE=dev
 
    
### 7. Changing Admin Username/Password.

 1. In order to change the admin credentials. You need to change it via environmental variables
    in spring boot (backend module) application.
    ```
        Update the below variables in env_vars.sh file.
        export ADMIN_USERNAME=
        export ADMIN_PASSWORD=
    ``` 
 2. The change will be reflected by restarting the application.
    ```
        [root@ip-192-168-1-37 backend]# ./app_script.sh -start
    ```
### 8. Enabling console logs

 1. To enable console logs in backend module (spring boot application) 
	set the environment variable i.e. ACTIVE_PROFILE to dev.
    
    ```
        export ACTIVE_PROFILE=dev
    ```

	set the environment variable i.e. ACTIVE_PROFILE to prod. This will redirect logs to logfile
	and it will not log on console.
    
    ```
        export ACTIVE_PROFILE=prod
    ```
 
 2. To enable console logs in frontend module (react application)
	set the environment variable i.e. REACT_APP_SERVER_URL to dev
    
    ```
	    export REACT_APP_SERVER_URL=dev
    ```

	set the environment variable i.e. REACT_APP_SERVER_URL to prod. This will disable the logs in production.
    
    ```
        export REACT_APP_SERVER_URL=prod
    ```  
    
### 9. Troubleshooting

 1. If client is unable to contact server and throws below error.
    
    ```
        Access to XMLHttpRequest at 'http://54.203.176.192:8090/api/auth/verify' from
        origin 'http://localhost:7071' has been blocked by CORS policy: Response to preflight
        request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    ```
    
    Then you need configure CORS in the backend server in order all allow the origin.
    You can do this by setting CLIENT_URL env variable in the backend module to your client url.
    
    ```
        CLIENT_URL=http://localhost:7071
    ```
    
    If still doesn't works then go to SecurityConfig.java file
     
    ```
        REPLACE the below line
    
        configuration.setAllowedOrigins(Arrays.asList(System.getenv("CLIENT_URL")));
    
        WITH
    
        configuration.setAllowedOrigins(Arrays.asList("*"));
    
        NOTE: By putting "*" will be dangerous in the production env, as server will serve request to any client URL. In other words, any website can access the backend services.     
    ```