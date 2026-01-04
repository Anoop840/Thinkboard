📝 ThinkboardThinkboard is a full-stack MERN application that allows users to create, view, edit, and delete notes. It features a modern, responsive UI built with Tailwind CSS and DaisyUI, integrated with Upstash Redis for rate limiting to ensure application stability.🚀 FeaturesFull CRUD Functionality: Create, Read, Update, and Delete notes seamlessly.Modern UI/UX: Responsive design using React, Tailwind CSS, and DaisyUI.Rate Limiting: Integrated Upstash Redis rate limiting to prevent API abuse.Real-time Notifications: User-friendly toast notifications for actions like saving or deleting.Dynamic Routing: Smooth page transitions using React Router.🛠️ Tech StackBackendNode.js & Express: Server-side logic and API routing.MongoDB & Mongoose: Database and object modeling.Upstash Redis: Serverless rate limiting.Dotenv: Environment variable management.FrontendReact (Vite): Fast development and optimized builds.Tailwind CSS & DaisyUI: Utility-first styling and component library.Axios: Promise-based HTTP client for API requests.Lucide React: Clean and consistent iconography.⚙️ Installation1. Clone the repositoryBashgit clone <your-repo-url>
cd thinkboard
2. Backend SetupBashcd backend
npm install
Create a .env file in the backend directory:Code snippetPORT=5001
MONGODB_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
3. Frontend SetupBashcd ../frontend/thinkboard
npm install
🏃 Running the ApplicationStart BackendBashcd backend
npm run dev
The server will run on http://localhost:5001.Start FrontendBashcd frontend/thinkboard
npm run dev
The application will be available at http://localhost:5173.📂 API EndpointsMethodEndpointDescriptionGET/api/notesGet all notesGET/api/notes/:idGet a specific note by IDPOST/api/notesCreate a new notePUT/api/notes/:idUpdate an existing noteDELETE/api/notes/:idDelete a note🛡️ LicenseDistributed under the ISC License.
