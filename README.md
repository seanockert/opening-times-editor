# Opening Time Picker
Part of an admin interface to set the open and close times of a department for each day. 
Built in Vue.js

## Demo
https://so-opening-times-editor.surge.sh

## Installation
Install the dependencies:
``` js
 npm install
```
Then run the dev server:
``` js
 npm run dev
```

## Design requirements
- Toggle each day of the week as open or closed
- Set an open and close time for each day
- Allow for a break in the day (eg. open 9am-11am and 1pm-5pm)
- Allow for closing time to be after midnight (eg. 1am the next day)
- Make exceptions for certain dates in the year (eg. closed Christmas Day)

## Usage
- Click a day of the week to edit its opening hours. Tap the X to close on that day.</li>
- If the closing time is before, or the same as the opening time, it will assume it's open past midnight and add a 'next day' tag
- If the department is closed some time during the day, tap 'Add a break' to add a second set of open hours
- The department might be closed on certain days of the year. Select QLD public holidays from the dropdown list, or type in your own dates to add them to the list
- See the output updated as you edit
- Changes are saved as JSON to your browser's local storage. But could easily be sent to a backend 

## Issues
Despite its apparent simplicity, there are likely to be many edge-cases, for example:

- A department or class might have multiple 'session times', beyond the single break per day
- A department might be closed for an extended period eg. uni holidays. We would need a date range picker, or allow a date range to be typed in eg. 23/12 - 5/1

## Improvements
- Change local storage saving to a more permanent store eg. Firebase
- Pull in a list of current QLD holidays from data.gov.au instead of manually adding holidays
- Add more feedback when changing times (eg. warn if opening time is before closing time)
- Test UI with actual users to see if their requirements are met, or if there are any edge-cases that are more common than assumed
