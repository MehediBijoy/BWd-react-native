# \<Feature name\>

## Description

Please include a summary of the changes and the related issue. 
List any dependencies that are required for this change.

- Related Issue #
- Fixes # (issue)

## Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring or style update (formatting, local variables, comments, no functional changes, no API changes)
- [ ] Test code improvements

## QA Instructions, Screenshots, Recordings

_Please replace this line with instructions on how to test your changes, a note
on the devices and browsers this has been tested on, as well as any relevant
images for UI changes._

## Developer's Checklist

#### 1. **Code Writing:**

- **Functionality:**
    - [ ] Implement the new feature according to the specified requirements.
    - [ ] Ensure the code integrates seamlessly with existing functionality.
- **Code Structure:**
    - [ ] Write modular and maintainable code.
    - [ ] Follow coding conventions and style guidelines.
- **Error Handling:**
    - [ ] Implement proper error handling for potential issues.
    - [ ] Provide meaningful error messages for debugging.
- **Logging:**
    - [ ] Include relevant log statements to aid in debugging.
    - [ ] Ensure logs are clear and concise.
- **Deployment:**
    - [ ] Ensure code follows Blue/Green Deployment Update rules.
    - [ ] If you need to execute post-deployment actions (e.g. script to create required objects for this feature), create a migration file providing rollback function.

#### 2. **Test Code Writing:**

- **Unit Tests:**
    - [ ] Write comprehensive unit tests for the new feature.
    - [ ] Verify edge cases and boundary conditions.
- **Integration Tests:**
    - [ ] Create integration tests to ensure the feature interacts correctly with existing components.
    - [ ] Validate data flow and communication between services.
- **End-to-End Tests:**
    - [ ] Develop tests that cover user scenarios related to the new feature.
    - [ ] Test the feature in conjunction with other parts of the application.
- **Security Testing:**
    - [ ] Check for vulnerabilities (OWASP Top 10).
    - [ ] Test authentication and authorization mechanisms.
- **Performance Testing:**
    - [ ] Evaluate app response times under different loads.
    - [ ] Identify and optimize bottlenecks.
- **Browser Compatibility:**
    - [ ] Test the web app on various browsers and devices.
    - [ ] Ensure a responsive design.

#### 3. **Documentation:**

- **User Documentation:**
    - [ ] Update user manuals and guides to include information about the new feature.
    - [ ] Clearly explain how users can interact with the feature.
- **Code Documentation:**
    - [ ] Document all new code, explaining its purpose and functionality.
    - [ ] Update relevant API documentation if applicable.
- **Release Notes:**
    - [ ] Add information about the new feature to the [Description](#description).
    - [ ] Highlight any changes or improvements that users need to be aware of.

#### 4. **Future Planning:**

- **Backlog Update:**
    - [ ] Review and update the backlog based on the latest changes.
    - [ ] Prioritize and schedule future tasks.
- **Documentation Improvement:**
    - [ ] Plan for improving documentation where necessary.
    - [ ] Consider documenting technical debt and areas for improvement.

🔥 Now you are ready to request a code review!

## Code Reviewer's Checklist

- **Review Code Changes:**
    - [ ] Evaluate the overall structure and organization of the code.
    - [ ] Inspect code changes for correctness and adherence to coding standards and best practices.
    - [ ] Check for potential security vulnerabilities.
- **Code Quality:**
    - [ ] Assess code readability and modularity and maintainability.
    - [ ] Identify and address suggest code improvements for any complex or intertwined logic.
- **Error Handling:**
    - [ ] Verify that error handling is robust and covers potential issues.
    - [ ] Ensure error messages are informative and helpful.
- **Documentation Review:**
    - [ ] Ensure that inline code comments are informative.
    - [ ] Verify that the documentation is updated to reflect code changes.
    - [ ] Confirm that release notes accurately reflect the changes made by the new feature.
    - [ ] Check for any missing information that should be included.
- **Test Coverage:**
    - [ ] Confirm that new code is covered by unit and integration tests.
    - [ ] Verify that tests are well-written and follow testing best practices.
    - [ ] Ensure test coverage metrics are acceptable.
- **Backward Compatibility:**
    - [ ] Assess the impact of the new feature on backward compatibility.
    - [ ] Ensure existing functionality remains unaffected.
    - [ ] Ensure code follows Blue/Green Deployment Update rules.
- **Performance:**
    - [ ] Check for any potential performance issues introduced by the new feature.
    - [ ] Assess resource usage and responsiveness.
- **Provide Constructive Feedback:**
    - [ ] Offer constructive feedback to the developer for improvement.
    - [ ] Encourage collaboration and discussion for enhancement.
