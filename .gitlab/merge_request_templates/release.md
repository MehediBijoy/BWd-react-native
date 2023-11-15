# x.x.x Production Release

*Release notes should be pasted here.*

## Pre-Deployment Checklist

- **Backward Compatibility:**
  - [ ] Assess the impact of the release on backward compatibility.
  - [ ] Ensure existing functionality remains unaffected.
  - [ ] Ensure code follows Blue/Green Deployment Update rules.
- **Environment Configuration:**
  - [ ] Verify that test and production environment settings are correct.
  - [ ] Double-check database connection strings and API endpoints.
- **Data Backups:**
  - [ ] Backup production data before deployment.
  - [ ] Ensure data restoration processes are in place.

## Deployment Checklist

- **Integration Testing:**
  - [ ] Test interactions between different components/modules.
  - [ ] Validate data flow and communication between services.
- **Critical User Flows Testing:**
  - [ ] Verify that your changes are applied correctly
  - [ ] Verify user registration
  - [ ] Verify user login
  - [ ] Verify payments are working correctly
  - [ ] Verify 2FA is working correctly
  - [ ] Verify payouts are working correctly
  - [ ] Verify commissions are working correctly
  - [ ] Verify main user frontend components are displayed correctly
  - [ ] Verify main admin frontend components are displayed correctly
  - [ ] Verify admin frontend platform settings are working correctly
- **Performance Testing:**
  - [ ] Evaluate app response times under different loads.
- **Browser Compatibility:**
  - [ ] Test the web app on various browsers and devices.
  - [ ] Ensure a responsive design.
- **Mobile Compatibility:**
  - [ ] Test the mobile app on various devices.
  - [ ] Ensure a responsive design.

## Future Planning

- **Backlog Update:**
  - [ ] Review and update the backlog based on the latest changes (check code updates for technical or test debt).
  - [ ] Prioritize and schedule future tasks.
- **Documentation Improvement:**
  - [ ] Plan for improving documentation where necessary.
  - [ ] Consider documenting technical debt and areas for improvement.

## Deployment Procedure

1. Create/replace RELEASE_NOTES.md with release description.
2. Append release notes in the end of CHANGELOG.md. 
3. Paste release notes in MR.
4. Go through [Pre-Deployment Checklist](#pre-deployment-checklist) and [Future Planning](#future-planning).
5. Request Release Leader approval.
6. Merge the MR.
7. Go through [Deployment Checklist](#deployment-checklist) on the *test* environment.
8. Create a new tag with release version.
9. Verify your changes are on the *prelive*.
10. Verify Critical User Flows are working correctly on *prelive*.
11. Call the `Switch` procedure.
12. Verify your changes are on the *live*.
13. Verify Critical User Flows are working correctly on *live*.

> Release Team can consider to execute steps 6, 8 and 11 
> in the following order: 
> 1. crypto-api
> 2. platform-backend
> 3. user-frontend
> 4. admin-frontend
> 5. mobile apps deployment

## Post-Deployment Procedure

1. **Performance Monitoring**
   1. Monitor system resource usage and track app performance.
   2. Identify and address any performance degradation.
   3. Stay tuned for alerts from monitoring stack.
2. **User Feedback**
   1. Address any immediate issues reported by users.

## Rollback Procedure

1. ❗️Be sure that code updates follow Blue/Green Deployment Update rules. 
2. Release Team executes `Switch` procedure in GitLab Pipelines panel one more time (in each of the updated projects).
3. Test that *live* environment doesn't have new code changes.
4. New changes are on the *prelive*.

> If Release Team followed an order during the deployment and switching, 
then `Switch` procedure has to be called in reverse order.

## Communication

Release Team has to communicate through the Asana "Release"
dialogue. All the members have to be in touch during
deployments, especially in case when updates have to
be deployed following correct order.
