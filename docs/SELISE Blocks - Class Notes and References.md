SELISE Blocks  
Class Notes (Clean & Formatted)

1\. Overview  
SELISE Blocks is a modular application platform designed to build, deploy, and manage modern cloud-native applications. It operates similarly to platforms like Vercel, AWS, and Azure, but focuses on unifying multiple services into a single cohesive system rather than requiring developers to manage many independent tools.

2\. Motivation and Problem Statement  
Modern software development repeatedly requires similar infrastructure components such as authentication systems, file storage, monitoring, and backend APIs. Traditionally, these systems require manual setup and server-level interaction (e.g., SSH). This leads to fragmentation, complexity, and increased development time.

SELISE Blocks addresses this by providing a visual, centralized platform that abstracts infrastructure complexity and reduces repetitive engineering work.

3\. Architecture Philosophy  
Blocks is built on a microservices-based architecture but avoids fragmentation by grouping related services into unified modules. Instead of multiple disconnected services, developers interact with logical service groups.

The system also enforces restrictive default configurations to prevent misconfigurations, security issues, and deployment errors.

4\. Core Services  
Blocks provides multiple integrated service categories:

Identity  
Handles authentication and authorization using token-based systems such as JWT.

Observability  
Provides logging, monitoring, and system health insights.

Data Gateway  
Acts as a centralized data access layer using GraphQL. It abstracts backend communication and manages access control.

Blocks AI  
Provides AI-related capabilities integrated into the platform.

Deployment  
Manages application deployment and environment configuration.

Localization  
Supports multilingual content management and real-time updates.

Workflow  
Enables automation of business processes and logic.

Communications  
Handles messaging, notifications, and integrations.

5\. Data Gateway (Detailed)  
The Data Gateway is one of the most important components of Blocks.

It uses GraphQL instead of REST APIs and acts as a unified interface for accessing backend data. Authentication is handled using JWT tokens, which are issued to users and validated by the platform before granting access.

The system supports Row-Level Security (RLS), allowing fine-grained control over which users can access specific data.

A reference application called “Construct” is provided as a template to demonstrate how to properly use the Data Gateway in real-world applications.

6\. Developer Workflow  
Blocks emphasizes a developer-friendly workflow with both GUI and CLI support.

Most configurations are handled through a graphical interface, reducing the need for manual DevOps work. When a project is created, the platform provides API keys and CLI commands.

The CLI can download a starter project (Construct), configure environment variables, and set up the development environment.

However, not all features are available through the CLI, and some advanced configurations must be handled manually.

7\. Environment Management  
Blocks integrates environment management with version control.

Typical mapping:  
\- main branch → production  
\- dev branch → development

This allows automatic synchronization between Git branches and deployment environments.

8\. Localization System  
Blocks provides a Chrome extension that allows real-time editing of UI content for different languages.

Each UI element is associated with a key, and permissions determine who can modify or use these elements. Changes made through the extension are synced instantly via APIs.

9\. Database Layer  
Blocks primarily uses MongoDB, a NoSQL database system. This allows flexible schema design and easier handling of dynamic data structures.

10\. API System  
Each service exposes API endpoints that are accessed using GraphQL. Requests require proper authentication headers (typically JWT tokens).

11\. Key Takeaways  
\- SELISE Blocks is a unified platform for full-stack application development.  
\- It reduces infrastructure complexity by abstracting common services.  
\- It emphasizes security through restrictive defaults and access control.  
\- It uses GraphQL and JWT as core technologies.  
\- It integrates development, deployment, monitoring, and localization into a single system.

References  
Official SELISE Blocks Website: https://selisegroup.com/blocks/  
SELISE Blocks Documentation: https://docs.seliseblocks.com/  
SELISE GitHub Organization: https://github.com/SELISE  
GraphQL Documentation: https://graphql.org/learn/  
JWT Introduction: https://jwt.io/introduction  
MongoDB Documentation: https://www.mongodb.com/docs/  
Microservices Architecture (Martin Fowler): https://martinfowler.com/articles/microservices.html  
\# SELISE Blocks: Class Notes and Reference Guide

Prepared from lecture notes and public online research.  
Last updated: April 29, 2026

\#\# 1\. Executive Summary

SELISE Blocks is a developer-focused enterprise cloud platform / cloud operating system designed to help teams build, deploy, secure, monitor, localize, and extend applications without repeatedly rebuilding common infrastructure. It sits in a space that overlaps with platforms such as Vercel, AWS, Azure, and internal developer platforms, but its value proposition is different: it combines a ready-to-use application blueprint called Construct with configurable backend services, identity management, data access, localization, AI, workflows, deployment, and observability.

The main idea is simple:

Instead of every team rebuilding authentication, roles, file storage, data APIs, deployment scripts, monitoring, localization, and AI integrations from scratch, Blocks gives those capabilities as configurable platform services.

A useful way to remember the platform is:

Configure on Blocks Cloud \-\> Download or use Construct \-\> Build domain logic \-\> Deploy \-\> Observe and operate

This makes Blocks especially relevant for enterprise software development, where the hard part is often not just writing business logic, but repeatedly solving the same surrounding problems: user management, secure access control, environment setup, CI/CD, multilingual content, monitoring, logs, traces, storage, and integrations.

\#\# 2\. Why Blocks Was Created

Your lecture notes describe the motivation very well: many software projects repeat the same infrastructure work. Almost every serious business application eventually needs:

\- User authentication and authorization  
\- Roles and permissions  
\- Secure data storage and file handling  
\- Environment separation, such as development, staging, and production  
\- Logs, metrics, traces, and monitoring  
\- Deployment pipelines  
\- Secure defaults  
\- Localization / multilingual content management  
\- Integration with external APIs  
\- Admin panels and operational dashboards

Traditionally, these pieces are assembled manually. Developers often need to configure cloud services, write backend glue code, manage credentials, set up CI/CD, and sometimes SSH into servers. This creates repeated work, inconsistent security, and many opportunities for mistakes.

Blocks attempts to solve this by turning these repeated needs into reusable, configurable platform services. The public SELISE Blocks site describes it as a platform for developing and deploying secure, scalable applications with built-in observability, AI agents, and identity management, allowing teams to focus more on domain logic and less on infrastructure.

\#\# 3\. Positioning: How Blocks Compares to Vercel, AWS, and Azure

Blocks has some similarity to large cloud and deployment platforms, but it should not be understood as simply “another AWS” or “another Vercel.”

\#\#\# Compared with AWS or Azure

AWS and Azure provide broad infrastructure primitives: compute, storage, databases, networking, monitoring, IAM, serverless functions, Kubernetes, queues, and many other services. They are powerful but often require significant configuration and architecture decisions.

Blocks is more opinionated. It packages common application needs into higher-level modules that are easier to configure through a portal. Rather than asking developers to wire everything manually, it gives default patterns and predefined service integrations.

\#\#\# Compared with Vercel

Vercel focuses heavily on frontend and full-stack web deployment, especially for frameworks such as Next.js. It is excellent for fast deployments, previews, and frontend developer experience.

Blocks goes broader into enterprise application foundations. It includes identity, roles, permissions, localization, data gateway, storage, AI agents, workflow automation, observability, and deployment. It is closer to an internal developer platform or application platform-as-a-service than only a hosting platform.

\#\#\# Compared with an internal developer platform

Blocks resembles an internal platform because it standardizes common development workflows. However, SELISE presents Blocks as a productized platform with open-source components, a cloud portal, public documentation, and public Construct repositories.

\#\# 4\. Core Philosophy

The philosophy behind Blocks can be summarized in five principles.

\#\#\# 4.1 Configure behavior, do not rewrite glue code

A major theme in Blocks is reducing glue code. Instead of manually integrating authentication, storage, localization, and observability, the developer configures services in the portal and then works from a pre-integrated application foundation.

\#\#\# 4.2 Modular architecture instead of one monolithic system

Blocks uses a modular architecture. SELISE describes Blocks as using modular microservices so that teams can isolate issues, reuse components, and scale services more flexibly. This matches your note that Blocks branched into many microservices, but similar services are grouped so everything does not feel like a separate app.

\#\#\# 4.3 Secure and restrictive defaults

Your notes mention that defaults are more restrictive to prevent mistakes. This fits the enterprise positioning of Blocks: authentication, access rules, MFA, CAPTCHA, roles, permissions, SAST/SCA/DAST checks, and access-controlled services are treated as first-class concerns rather than optional afterthoughts.

\#\#\# 4.4 Visual configuration through the GUI

A major purpose of Blocks is to reduce the need for SSH/server-level manual work. Most configurations happen through the Blocks Cloud portal: project creation, environments, identity, localization, data schemas, deployment, monitoring, and workflows.

\#\#\# 4.5 Standardized starting point through Construct

Construct is the ready-to-use application blueprint or starter app. It is pre-integrated with Blocks microservices and is designed to let developers start from a working full-stack foundation rather than an empty project.

\#\# 5\. Main Components of the Blocks Ecosystem

SELISE Blocks can be understood as a set of connected layers.

\#\#\# 5.1 Blocks Cloud Portal

The portal is the control center. It is where users create projects, configure environments, manage repositories, set up services, configure authentication, manage localization, define data schemas, deploy applications, and view observability data.

Important portal functions include:

\- Create and manage projects  
\- Add repositories  
\- Configure development, testing, staging, UAT, pre-production, production, and other environments  
\- Manage users and environment access  
\- Configure identity, MFA, CAPTCHA, and access control  
\- Define data schemas and GraphQL access  
\- Manage language keys and translations  
\- Deploy and monitor applications  
\- Configure AI agents and knowledge bases  
\- Build workflows visually

\#\#\# 5.2 Construct

Construct is the application blueprint provided by SELISE Blocks. The public GitHub repository describes it as a ready-to-use application blueprint built to accelerate development with SELISE Blocks. It is pre-integrated with core microservices and provides a scalable full-stack foundation with essential features, prebuilt modules, and practical use cases.

Your lecture notes mention a dummy app called Construct that students will use to understand the Data Gateway. This matches the public Construct React repository and the Construct site.

\#\#\# 5.3 Core services

Blocks groups services into major foundations. Based on the official site, docs, and your notes, the important services include:

\- Identity and Access Manager  
\- Data Gateway and Storage  
\- Localization and browser extension  
\- Deployment and hosting  
\- Observability / LMT: logs, metrics, and traces  
\- Blocks AI: agents, models, tools, and knowledge bases  
\- Workflow automation  
\- Communications / email-related services  
\- Utilities and people/project management

\#\# 6\. Project and Environment Setup

When a project is created in Blocks Cloud, the project can be connected to a repository and mapped to environments. Public documentation states that project creation includes repository connection and environment selection. If deployment is used, the repository needs corresponding branches.

The documented branch-to-environment mapping is:

| Environment | Branch |  
|---|---|  
| Development | dev |  
| Testing | test |  
| Staging | stg |  
| IAT | iat |  
| UAT | uat |  
| Prod Shadow | prod-shadow |  
| Pre-Prod | pre-prod |  
| Production | main |

This confirms your lecture note that branches can sync with different environments when they are named properly, such as dev mapping to development and main mapping to production.

\#\#\# Important idea

This branch mapping turns Git into part of the deployment model. Instead of treating environments as unrelated manual setups, Blocks can connect environment behavior directly to repository branches.

\#\# 7\. Identity and Access Management

Identity appears to be one of the most mature and central Blocks services. The official docs describe the Authentication service as a centralized way to manage how users access Construct applications. It supports email/password login, social sign-in, client credentials, and external identity providers.

\#\#\# 7.1 Authentication features

Blocks Authentication includes:

\- Access token validity settings  
\- Refresh token validity settings  
\- “Remember me” token validity  
\- Maximum wrong attempts before account lock  
\- Account lock duration  
\- Email/password login  
\- Social login  
\- Client credentials  
\- SSO  
\- External identity provider integration

The docs mention external identity providers such as Keycloak, Okta, Auth0, Azure, and others. The main SELISE Blocks site also lists integrations such as Keycloak, Okta, and Azure AD.

\#\#\# 7.2 Client credentials

Client credentials are used for machine-to-machine access. Your lecture note about API access through tokens fits this model. A client credential can receive an access token, but that token only works correctly if the credential has the required roles and permissions.

\#\#\# 7.3 Access Manager

Access Manager manages users, roles, permissions, organizations, activation links, recovery links, and login-related actions. It can also handle multiple organizations, allowing different teams or clients to have separated users, roles, and resources.

Key concepts:

\- Users can be invited  
\- Users can be assigned roles and permissions  
\- Organizations can separate teams, departments, or clients  
\- Users can belong to more than one organization  
\- Roles should group permissions instead of assigning too many individual permissions to users  
\- Client credentials require the correct role/permission configuration to access protected APIs

\#\#\# 7.4 Permission naming convention

The docs give an important permission convention for endpoint protection:

service::controller::action

Your lecture note specifically mentioned:

blocks-localization-api::key::save

The public Access Manager docs confirm this exact example as the permission resource needed for saving a localization key.

This is important because it shows how Blocks treats API authorization: authentication alone is not enough. The token must contain the correct permissions for the resource being accessed.

\#\#\# 7.5 MFA and CAPTCHA

Blocks supports multi-factor authentication using email verification codes or authenticator apps. MFA is disabled by default, but administrators can enable and configure it.

CAPTCHA is also supported. Public documentation mentions Google reCAPTCHA and hCaptcha. CAPTCHA is not configured by default, and only one CAPTCHA provider can be enabled at a time.

\#\# 8\. Data Gateway

The Data Gateway is one of the most important parts of Blocks.

Your notes say:

\- It avoids direct credential handling for the backend  
\- The user gets a token/JWT  
\- SELISE verifies access to data  
\- There is no REST API for this gateway  
\- GraphQL is used  
\- RLS policies can be created  
\- The DB is Mongo/NoSQL-oriented rather than SQL  
\- Settings expose API URLs that can be called with headers

The public docs confirm the key ideas: Data Gateway provides a unified interface for modeling and accessing application data, allows schemas to be defined, and supports automatically generated GraphQL endpoints.

\#\#\# 8.1 Purpose

The Data Gateway reduces the need to manually build backend APIs for every entity. Instead, developers define schemas and access rules, then use generated GraphQL queries and mutations to perform CRUD operations.

\#\#\# 8.2 Data source options

Blocks Data Gateway can use:

\- Blocks Cloud’s hosted data infrastructure  
\- An external data source such as MongoDB Atlas or a similar database hosting service

The public SELISE Blocks material describes managed blob storage and a NoSQL database, which aligns with your lecture note that the database is Mongo/NoSQL-oriented rather than SQL.

\#\#\# 8.3 Schema definition

In the Data Gateway, developers define schemas. A schema can represent an entity/table/collection or a child/nested object.

Schema editing includes:

\- Adding properties  
\- Deleting properties  
\- Renaming properties  
\- Changing data types  
\- Marking properties as arrays  
\- Setting access levels  
\- Applying validation

Important note: schema changes may not affect APIs until the schema is reloaded or published, depending on the current Data Gateway workflow.

\#\#\# 8.4 GraphQL access

Once schemas are defined, Blocks generates GraphQL endpoints for CRUD operations. The Data Playground can help test queries and mutations.

This matters because GraphQL allows the client to request exactly the data it needs, while the gateway enforces access policies.

\#\#\# 8.5 Authorization model

Blocks supports:

\- Row-Level Security (RLS)  
\- Column-Level Security (CLS)  
\- Schema-level access control  
\- Column-level access control  
\- Custom rule-based access control

The docs describe schema-level actions such as View, Create, Edit, and Delete. Column-level access can define whether specific fields are viewable, creatable, or editable.

Access types include:

\- Public  
\- All logged in users  
\- Inherited  
\- Custom access rules

Custom rules can use:

\- Auth data, such as user ID, email, roles, and permissions  
\- Schema fields  
\- Operators such as equal, not equal, in, not in, starts with, ends with, is null, and is not null  
\- Comparisons against auth values, schema fields, or static values

\#\#\# 8.6 Why this matters

Data Gateway is not just a database UI. It is an authorization-aware data access layer. The platform approach is:

\- Define schema  
\- Define access policy  
\- Get GraphQL API  
\- Use token/JWT-based access  
\- Let Blocks enforce whether the current user/client credential can read or write the requested data

This is why your note about not worrying about credentials is important. Developers should not pass around raw database credentials in frontend or ordinary app logic. Instead, they work through authenticated platform APIs.

\#\# 9\. Storage and File Access

Your notes mention that most applications need a secure way to store and use files. The official Blocks homepage describes Data Gateway and Storage as providing GraphQL APIs on top of managed databases plus scalable, S3-compatible cloud storage. The Data Gateway section also mentions presigned URLs for file upload and APIs to use and download files.

Important concept:

Storage is usually separated from direct credential exposure. A secure platform typically issues controlled upload/download URLs or API-mediated access rather than exposing storage credentials to the application.

This is especially important in enterprise systems because file access often depends on role, organization, user identity, or document ownership.

\#\# 10\. Localization and the Browser Extension

Localization is a core Blocks service. The official docs describe it as a service for configuring and managing multilingual interfaces.

\#\#\# 10.1 Keys and modules

Localization is based on keys. A key represents a text value in the UI. For example:

auth.welcome\_message

The key can then have values in multiple languages.

Modules organize keys into logical groups. For example:

\- auth module for login and registration text  
\- common module for shared buttons and labels  
\- dashboard module for dashboard-specific content

Your notes mention that each key could represent a UI element that a user can drag and drop or edit. The important concept is that UI text should not be hardcoded. It should be mapped to keys that can be edited and translated.

\#\#\# 10.2 Existing keys in Construct

The docs mention that many keys and modules are already built and mapped to text in the Construct frontend app. This explains why Construct is useful as a learning application: students can see how the platform’s localization system is connected to the actual UI.

\#\#\# 10.3 Browser extension

Your notes mention a Chrome extension that allows per-language content edits and real-time syncing with the app, whether local or deployed. The public docs and SELISE article confirm a Language/UILM browser extension for WYSIWYG editing.

The extension allows users to:

\- Sign in with the same Blocks Cloud email  
\- Select project and environment  
\- Toggle between key mode and value mode  
\- Right-click/select text to view suggested keys  
\- Edit values  
\- Translate values  
\- See changes reflected in the UI

The SELISE article about Blocks UILM also states that the extension works across frontend projects such as Angular, React, and others, and supports project-aware translation across environments, AI-driven translation, real-time preview, and key-mode detection.

\#\#\# 10.4 Permission example

Your lecture note:

blocks-localization-api::key::save

This is the permission required to save localization keys through the localization API. The public Access Manager documentation confirms this exact resource string.

\#\#\# 10.5 Why localization is important

For enterprise applications, localization is not just translation. It is a workflow problem:

\- Product teams need to change text without redeploying.  
\- Translators need context.  
\- Developers need stable keys.  
\- Different environments need different translation states.  
\- Permissions must prevent unauthorized translation changes.  
\- Teams may need bulk edits during rebranding or feature launches.

Blocks tries to make localization operational rather than just a static file inside the codebase.

\#\# 11\. Deployment and Hosting

Blocks includes deployment functionality through the Hosting & Observability module.

The public docs state that Blocks can:

\- Deploy projects through automatic or manual deployment modes  
\- Configure hosting regions and machine specifications  
\- Show live deployment logs  
\- Store deployment history  
\- Show SAST, SCA, and DAST-related results  
\- Support custom domains  
\- Monitor deployments

\#\#\# 11.1 Current deployment limitation

The documentation states that deployment is currently supported for repositories built on top of Blocks Construct as a foundation. Repositories outside that scope may fail to deploy.

This is an important practical limitation. Blocks is not simply a generic host for any arbitrary repository. The safest assumption for class/demo work is that deployment is intended around Construct-based projects.

\#\#\# 11.2 Git-based and Blocks Cloud-based deployment

The docs mention two deployment types:

\- Git-based deployment: deployment starts when a push is made to the connected repository.  
\- Blocks Cloud-based deployment: users manually initiate deployment from the Blocks Cloud platform.

This connects to your note about branch names syncing with environments.

\#\#\# 11.3 Security scanning

Blocks deployment history can include:

\- SAST: Static Application Security Testing  
\- SCA: Software Composition Analysis  
\- DAST: Dynamic Application Security Testing

The docs note that DAST is currently under development.

This matches the enterprise goal: deployment is not just “ship code,” but also “ship code with security and observability.”

\#\# 12\. Observability: Logs, Metrics, and Traces

Observability is another core Blocks service. The public documentation refers to LMT: Logs, Metrics, and Traces.

\#\#\# 12.1 Logs

Logs are records of service events and actions. They help debug issues and monitor activity.

The docs mention:

\- Filtering logs by date or log level  
\- Searching logs  
\- Viewing logs per service  
\- Clicking trace IDs from log entries  
\- Using “Ask AI” to analyze logs

\#\#\# 12.2 Traces

Traces show the timeline of requests and actions across services. They help identify bottlenecks and understand how a request moved through a system.

The docs mention:

\- Trace list  
\- Filtering by date or service name  
\- Trace details with timeline, annotations, and attributes  
\- AI-powered querying of trace information

\#\#\# 12.3 My Services

The My Services docs describe registering services to collect logs and traces. It also mentions OpenTelemetry integration, multi-tenant support, automatic batching, retry logic, and packages for .NET and Python.

\#\#\# 12.4 Why observability is a platform feature

In a microservice-based system, debugging cannot rely only on print statements or local logs. Teams need centralized logs, metrics, traces, deployment history, uptime monitoring, and alerts. Blocks includes these as platform capabilities so every project does not need to manually configure separate tools such as CloudWatch, Datadog, Grafana, Jaeger, or custom logging pipelines.

\#\# 13\. Blocks AI

Blocks AI is described as model-provider agnostic. It supports AI agents, knowledge bases, tools, models, and integration into applications.

\#\#\# 13.1 Agents

Agents are configurable assistants. The docs describe them as having personalities, knowledge bases, behavior settings, memory/retrieval settings, and embedding options.

Agent types include:

\- Sequential agents  
\- Reasoning agents

The docs explain that sequential agents plan tasks together and execute them in parallel, while reasoning agents perform tasks step-by-step and are better for complex scenarios but use more AI credits.

\#\#\# 13.2 Knowledge bases and RAG

Knowledge bases support Retrieval-Augmented Generation (RAG). This means the AI agent can answer using company-specific or product-specific knowledge rather than only general training data.

Supported knowledge sources include:

\- Raw text, with Markdown support  
\- Files such as .txt, .pdf, and Microsoft Word  
\- Links, including optional periodic crawling and recursive crawling  
\- Question-and-answer pairs

\#\#\# 13.3 Models

Blocks AI allows users to add official API models or open/custom deployments. The docs describe it as model provider agnostic, allowing major providers or custom self-hosted endpoints.

\#\#\# 13.4 Why this matters

Many companies want AI inside internal tools, customer support, HR portals, knowledge bases, dashboards, or admin workflows. Blocks AI makes AI part of the same platform as identity, access control, workflows, and observability.

\#\# 14\. Workflow Automation

Blocks Workflow is a visual automation builder. The docs describe it as a drag-and-drop system for triggers, actions, and conditional paths.

\#\#\# 14.1 Current status

The docs label Workflow as a developer preview. Core functionality is available, but advanced features such as conditionals, loops, and built-in functions are listed as upcoming.

\#\#\# 14.2 Core workflow concepts

A workflow consists of nodes.

Trigger nodes start a workflow. Examples:

\- Webhook trigger  
\- Email trigger

Action nodes perform work. Examples:

\- AI Agent  
\- Send Email  
\- HTTP Request

Executions record each workflow run. The execution history helps debug what happened in each node.

\#\#\# 14.3 Expressions

Workflow expressions use double curly braces to reference earlier data.

Examples:

{{$json.output.email}}

{{$node\["Webhook"\].json.output.customerEmail}}

This means Blocks Workflow can pass data between nodes without writing full backend orchestration code.

\#\#\# 14.4 Practical use case

Example support workflow:

1\. A support email arrives.  
2\. Email trigger starts the workflow.  
3\. AI Agent reads the email and extracts category and urgency.  
4\. HTTP Request sends the issue to a CRM/helpdesk.  
5\. Send Email sends an acknowledgement to the customer.

\#\# 15\. Important CLI and GUI Notes

Your lecture notes say:

\- Most things are configurable in the GUI.  
\- When you create a project, you get keys and CLI commands.  
\- CLI commands can download Construct into a folder and replace environment variables.  
\- Not all GUI options are available in the CLI.  
\- Some actions must be done manually or with computer-use tools and will not be made available for agents.

The public docs strongly support the GUI-first model: project creation, service configuration, environments, repositories, users, identity, data schemas, localization, deployment, and monitoring are all portal-based.

The important practical lesson is:

Do not assume everything can be automated from the CLI. For Blocks, the portal is part of the platform’s intended workflow.

This matters for agents and automation. Some operations may intentionally remain manual for security, permissioning, or product-control reasons.

\#\# 16\. How a Typical Blocks-Based Application Works

A typical flow looks like this:

1\. Create a Blocks Cloud account.  
2\. Create a project.  
3\. Choose environments.  
4\. Connect a Git repository.  
5\. Ensure branches match the environment naming rules.  
6\. Configure Identity:  
   \- login methods  
   \- token settings  
   \- SSO  
   \- client credentials  
   \- roles and permissions  
   \- MFA/CAPTCHA if needed  
7\. Configure Data Gateway:  
   \- choose Blocks Database or external MongoDB-compatible source  
   \- define schemas  
   \- configure schema-level and column-level access  
   \- test GraphQL in the playground  
8\. Configure Localization:  
   \- add languages  
   \- organize keys into modules  
   \- use extension for WYSIWYG editing  
9\. Download or use Construct.  
10\. Build domain-specific features.  
11\. Deploy through Git-based or manual deployment.  
12\. Monitor logs, traces, uptime, and security scan results.  
13\. Add AI agents or workflows if needed.

\#\# 17\. Class-Specific Details from Lecture Notes

The following points came from your lecture notes and are either confirmed by public docs or should be treated as class/demo-specific implementation guidance.

\#\#\# Confirmed or strongly supported by public documentation

\- Blocks overlaps with platform areas such as build, deploy, monitor, identity, AI, localization, data, and workflows.  
\- Construct is a public ready-to-use app blueprint for SELISE Blocks.  
\- Data Gateway uses GraphQL.  
\- Data Gateway supports schema creation and automatically generated CRUD operations.  
\- Blocks supports row-level and column-level access controls.  
\- Blocks supports environment setup and branch-environment mapping.  
\- Localization uses keys and modules.  
\- The browser extension supports in-browser localization editing and real-time preview.  
\- The permission resource blocks-localization-api::key::save is documented.  
\- Blocks supports deployment, monitoring, logs, traces, SAST/SCA/DAST-related visibility, and custom domains.  
\- Identity supports email/password, social login, client credentials, SSO, external IdPs, MFA, CAPTCHA, roles, and permissions.

\#\#\# Class/demo-specific or not fully verified from public docs

\- “No REST API for Data Gateway” was stated in the lecture notes. Public docs emphasize GraphQL for Data Gateway, but other Blocks services may expose APIs in other formats. So the safest phrasing is: “Data Gateway usage is GraphQL-centered rather than REST-centered.”  
\- “DB is Mongo, not SQL” matches the public direction toward NoSQL/MongoDB Atlas-like sources, but exact database support may change.  
\- “CLI downloads Construct and replaces environment variables” is consistent with the project setup idea but was not fully verified from the public docs during this research pass.  
\- “All GUI options are not in the CLI” should be treated as lecture-specific guidance unless confirmed by internal docs.

\#\# 18\. Key Terms

| Term | Meaning |  
|---|---|  
| Blocks Cloud | The cloud portal/platform used to configure Blocks services and projects |  
| Construct | Ready-to-use frontend/application blueprint pre-integrated with Blocks services |  
| Data Gateway | Schema-driven data access layer that generates GraphQL endpoints |  
| GraphQL | API query language used by Data Gateway for flexible data access |  
| JWT / token | Token used to prove identity and carry authorization information |  
| RLS | Row-Level Security; controls which records a user can access |  
| CLS | Column-Level Security; controls which fields a user can access |  
| IAM | Identity and Access Management |  
| MFA | Multi-Factor Authentication |  
| CAPTCHA | Bot-protection mechanism such as reCAPTCHA or hCaptcha |  
| UILM / Language extension | Browser-based localization tool for editing language keys and values |  
| LMT | Logs, Metrics, and Traces |  
| SAST | Static Application Security Testing |  
| SCA | Software Composition Analysis |  
| DAST | Dynamic Application Security Testing |  
| RAG | Retrieval-Augmented Generation, where AI answers using external/domain knowledge |  
| Workflow | Visual automation system using triggers, actions, expressions, and execution history |

\#\# 19\. Why Blocks Is Useful: A Developer’s Perspective

Blocks is useful because it reduces the “empty project problem.” In many enterprise projects, starting from zero means spending weeks on setup before product-specific work begins.

Without Blocks, a team may need to:

\- Choose an auth provider  
\- Implement login and token refresh  
\- Create roles and permissions  
\- Build admin tools  
\- Connect databases  
\- Write REST or GraphQL APIs  
\- Configure storage  
\- Set up localization files  
\- Create deployment pipelines  
\- Add logging and tracing  
\- Set up monitoring and alerting  
\- Add security scanning  
\- Integrate AI separately

With Blocks, many of these become platform configurations.

The tradeoff is that teams must follow Blocks’ structure, especially around Construct, portal configuration, environment naming, and service patterns. This is common in platform engineering: speed comes from standardization.

\#\# 20\. Study Questions

1\. Why does Blocks focus on reusable platform services instead of letting every team build everything from scratch?  
2\. How is Blocks different from AWS or Azure?  
3\. What role does Construct play in the Blocks ecosystem?  
4\. Why does Data Gateway use GraphQL, and what advantage does this give developers?  
5\. What is the difference between authentication and authorization in Blocks?  
6\. Why is a JWT/token not enough unless the correct permissions are attached?  
7\. What is the purpose of the permission resource string blocks-localization-api::key::save?  
8\. How do localization keys and modules help manage multilingual applications?  
9\. Why is branch-environment mapping useful in deployment?  
10\. What is the purpose of LMT in a microservice-based system?  
11\. Why is it risky to expose database or storage credentials directly to application code?  
12\. What are the benefits and tradeoffs of a GUI-first platform?

\#\# 21\. Short Exam-Ready Summary

SELISE Blocks is an enterprise application platform that helps teams build software faster by turning repeated infrastructure needs into configurable services. It provides a cloud portal, a ready-to-use Construct application blueprint, identity and access management, GraphQL-based data access, localization, deployment, observability, AI agents, and workflow automation. The platform is designed around modular microservices, secure defaults, visual configuration, and branch-based environment workflows. Its main benefit is that developers can focus on business logic instead of repeatedly building authentication, data APIs, storage, monitoring, localization, and deployment systems from scratch.

\#\# 22\. Public References and Links

Official SELISE / Blocks resources:

1\. SELISE Blocks official site  
https://seliseblocks.com/

2\. SELISE Group Blocks page  
https://selisegroup.com/blocks/

3\. SELISE Blocks documentation  
https://docs.seliseblocks.com/

4\. Blocks Cloud getting started documentation  
https://docs.seliseblocks.com/cloud/getting-started/

5\. Data Gateway documentation  
https://docs.seliseblocks.com/cloud/data-gateway/

6\. Authentication documentation  
https://docs.seliseblocks.com/cloud/identity/authentication/

7\. Access Manager documentation  
https://docs.seliseblocks.com/cloud/identity/access-manager/

8\. MFA documentation  
https://docs.seliseblocks.com/cloud/identity/mfa/

9\. CAPTCHA documentation  
https://docs.seliseblocks.com/cloud/identity/captcha/

10\. Localization documentation  
https://docs.seliseblocks.com/cloud/localization/

11\. Localization Extension documentation  
https://docs.seliseblocks.com/cloud/localization/extension/

12\. Deployment and Observability documentation  
https://docs.seliseblocks.com/cloud/deploy-and-observe/

13\. Logs and Tracing / LMT documentation  
https://docs.seliseblocks.com/cloud/logsandtracing/

14\. AI Agents documentation  
https://docs.seliseblocks.com/cloud/agents/

15\. Knowledge Base documentation  
https://docs.seliseblocks.com/cloud/knowledge/

16\. Models documentation  
https://docs.seliseblocks.com/cloud/models/

17\. Workflow documentation  
https://docs.seliseblocks.com/cloud/workflow/

18\. Construct React GitHub repository  
https://github.com/SELISEdigitalplatforms/blocks-construct-react

19\. Construct site  
https://construct.seliseblocks.com/

20\. SELISE Digital Platforms GitHub organization  
https://github.com/SELISEdigitalplatforms

21\. SELISE Blocks Skills GitHub repository  
https://github.com/SELISEdigitalplatforms/blocks-skills

SELISE articles and context:

22\. Blocks Cloud OS: Solving developer experience while stakes are rising  
https://selisegroup.com/blocks-cloud-os-solving-developer-experience-while-stakes-are-rising/

23\. SELISE Blocks: A New Era of Software Development  
https://selisegroup.com/selise-blocks-a-new-era-of-software-development/

24\. Blocks UILM: AI Powered Translation for Your Next Project  
https://selisegroup.com/blocks-uilm-ai-powered-translation-for-your-next-project/

Supporting technical references:

25\. GraphQL official introduction  
https://graphql.org/learn/

26\. JWT introduction  
https://jwt.io/introduction

27\. MongoDB documentation  
https://www.mongodb.com/docs/

28\. OpenTelemetry documentation  
https://opentelemetry.io/docs/what-is-opentelemetry/

29\. OWASP Source Code Analysis Tools / SAST background  
https://owasp.org/www-community/Source\_Code\_Analysis\_Tools

30\. OWASP Software Component Verification Standard / dependency risk background  
https://owasp.org/www-project-software-component-verification-standard/  
