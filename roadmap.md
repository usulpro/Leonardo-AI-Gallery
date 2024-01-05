
# Leonardo AI Gallery Project Roadmap

## 1. API Model Development
   - [ ] Implement API fetching logic in src/model/index.ts with Bearer token authentication.
   - [ ] Integrate main API endpoints provided by Leonardo AI with pagination for image generations.
   - [ ] Set up error handling for API requests.
   - [ ] Write unit tests for the API model logic.
   - [ ] **After setting up fetching:** Discuss response details, write type definitions, and decide on internal representation of generation objects.

## 2. Next.js Playground Setup
   - [ ] Develop the main page in playground/pages/index.tsx for testing API integrations and components.
   - [ ] Set up routes and environment variables for the playground.
   - [ ] Implement a demo gallery using the Gallery component.
   - [ ] Add functionality to interact with the dev Leonardo account.
   - [ ] **Interactive Development:** Implement fetching logic and playground for testing, then refine based on feedback.

## 3. UI Components Development
   - [ ] Develop the Button component in src/components/ui/Button.tsx.
   - [ ] Style the Button component using Tailwind CSS.
   - [ ] Ensure accessibility standards are met for UI components.
   - [ ] Create additional UI components as required.
   - [ ] **Before Starting UI Development:** Discuss the structure of React components for the gallery.

## 4. Gallery Component Development
   - [ ] Implement the Gallery component logic in src/components/lib/Gallery.tsx.
   - [ ] Develop the component to display and interact with images and generations.
   - [ ] Integrate API calls within the Gallery component for fetching images and handling statuses.
   - [ ] Implement custom interaction functionalities and handle image variants.
   - [ ] **After Each Endpoint Integration:** Clarify response details and update component logic.

## 5. GitHub Actions Workflow
   - [ ] Set up a workflow in .github/workflows for CI/CD.
   - [ ] Include steps for linting, running tests, and building the project.
   - [ ] Configure the workflow to run on push and pull request events.

## 6. Webhook Integration
   - [ ] Develop utility functions for webhook integration to handle notifications of completed operations.
   - [ ] Connect webhooks to the gallery component for real-time updates.

## 7. Documentation
   - [ ] Update README.md with detailed project information.
   - [ ] Create detailed documentation in the docs folder.
   - [ ] Document the API model and component usage.

## 8. General Development and Quality Assurance
   - [ ] Ensure code quality with ESLint and Prettier.
   - [ ] Conduct thorough testing of all components and functionalities.
   - [ ] Regularly update chatbot.md with project progress and details.

## 9. Feedback and Iteration
   - [ ] Review and test each component and functionality.
   - [ ] Iterate based on feedback and additional requirements.

## Additional Tasks
- [ ] Update the structure of 'generated_image_variation_generics' based on actual data.
- [ ] Implement testing for different 'presetStyle' values and complete the 'PresetStyle' enum.
- [ ] Create a models map to associate 'modelId' with their titles.

- [x] Move all type definitions to types.ts in the model folder.
- [x] Update endpoint files to use API_BASE_URL from config.ts.
- [x] Add UserInfo type to types.ts.
