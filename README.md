# Bicycle Health
Keep your bicycle healthy!

The app is deployed at https://bicycle-health-check.herokuapp.com/

The User Stories for the app are at https://trello.com/b/V2FaCV20

## ERD
<img width="1439" alt="ERD" src="https://github.com/TanyaPanich/BicycleHealth/blob/master/docs/images/ERD%20diagram.png">

### User Workflows

#### Sign Up
<ol type="1">
  <li>
    Check to see if there is any user saved in Local Storage.  If there is no user saved, continue with the Sign Up process.  If there is a user saved, continue with the Login process below.
  </li>
    When signing up with <b>Strava</b>
    <ol type="a">
      <li>Display Login for <b>Strava</b></li>
      <li>After a successful login to <b>Strava</b>, the account information is returned</li>
      <li>Create a record in users table</li>
      <li>When saving access_token, make sure to encrypt the data with <b>SECRET_KEY</b> and multiple salt rounds</li>
    </ol>
  <li>
    When signing up without <b>Strava</b>
    <ol type="a">
      <li>Prompt to enter First Name, Last Name, Middle Initial, Password and Confirm Password</li>
      <li>Prompt to add bicycle information.  User may add one or more bicycles. information</li>
      <li>Prompt to add various parts user would like to track from the app and its estimated mileage since the last repair/replacement.  User may add one or more parts.</li>
      <li>Prompt to add ride with mileage</li>
    </ol>
  </li>
  <li>
    Once sign up is complete, the current user is saved in the <b>Local Storage</b>
  </li>
</ol>

#### Login
<ol type="1">
  <li>Retrieve user information from the Local Storage and determine whether the user account is connected to <b>Strava</b> account.</li>
  <li>If the account is connected to  <b>Strava</b>:
    <ol type="a">
      <li>Retrieve access_token from users table</li>
      <li>Decrypt the access_token</li>
      <li>Retrieve the latest ride information</li>
      <li>Add new ride activities into rides table</li>
      <li>For each activity, pull weather information for the date and add to conditions table</li>
      <li>Update parts table with new mileages</li>
      <li>Change part status indicator</li>
      <li>If there were no additional activities since the last login, just display the current status</li>
    </ol>
  </li>
  <li>If the account is not connected to <b>Strava</b>:
    <ol type="a">
      <li>Display the current status</li>
      <li>User may select to enter ride information by selecting <b>Enter Ride</b></li>
      <li>Display dialog for user to enter Date and Distance</li>
      <li>When Date is entered, pull weather information for the date and add to conditions table</li>
      <li>Update parts table with new mileages</li>
      <li>Change part status indicator</li>
    </ol>
  </li>
</ol>

#### Repair / Replace Parts
1. User selects the part repaired or replaced by touching a part and selecting <b>Repair / Replace</b> button.
1. Prompt user with the part information.
1. The mileage on the part is reset.


## Project Document

1. [User Stories](docs/userStories.md)
1. [Agreements](docs/rules.md)
1. [Wireframes](docs/wireframes.md)
