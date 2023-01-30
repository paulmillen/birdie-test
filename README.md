# Birdie Developer Test

**Hello!**  Thank you for taking the time to consider this tech test solution.  I hope you enjoy assessing it as much as I enjoyed working on it. Without futher ado...

## Quickstart

You can view the solution [here](https://paulmillen-birdie.herokuapp.com/care-recipients/df50cac5-293c-490d-a06c-ee26796f850d/events).

This will show the latest events for that care recipient.  Use the calendar to select previous dates.

I believe there's only one care recipient ID in the events table, but if there were more you could change the path accordingly.  Also adding `?date=[YYYY-MM-DD]` will return any events for that date.

In the root:  
`$ npm install`

`$ npm run test` - runs the tests for both packages

`$ cd backend && npm run start` - to start the backend on 8080  
`$ cd frontend && npm run start` - to start the frontend on 5173

## Concept

To display events to a relative, the idea of a sort of calendar presented itself quite strongly in my mind.

Firstly I thought it was really important to enable the user to clearly see what has taken place and when with regards to their relatives care; in my experience one great source of anxiety was whether the carer had attended at all, so I wanted this to be something a user could check quickly and easily.

Secondly, I felt that a calendar enables the relative to maintain a kind of proximity to their loved one.  They can build a picture of their day, week or month in a very relatable format - being close to the person via the carer interactions when they may not be able to be present themselves a lot of the time.  Seeing a simple timeline of the headline events builds a narrative and a record of their loved one's life.  I was keen to present something personal rather than rows of data, at least in the primary view.

## Give more time...

### Frontend

Well, there is no denying that it's very functional and not terribly pretty!  There is certainly work to be done to make the design a little easier on the eye.  I would have added a bit more formatting of each of the event 'notes' and added an icon per event to make it easier for the user to parse at a glance what the timeline depicts - particularly for urgent events.  There is some work to be done to filter events in a more sensible way for the relative.  Perhaps allowing them to see 'headline' events with the option of more detailed events if desired.

I would have also liked to present more information on each event row on-click.  Perhaps a modal displaying more fully the event detail, carer information etc.  I would also have made the layout better for desktop - the immediate priority being mobile.

More functionally, the front end needs to be a bit more tolerant to error and present useful information to the user in the case that there's a problem upstream.

### Backend

I think that the events data structure lends itself well to a document data storage strategy so if I had endless time I would perhaps have migrated the records to something like DynamoDB.  Using a composite key based on care recipient ID and event timestamp would enable the events to be accessed with one query, no need to do a separate query to establish the latest days events first.  There would be a lot of flexibility in the way the sort key could be queried to grab all events by dates or times very easily and quickly.  Useful secondary indexes could be created for e.g. care giver ID.  It would also be very easy to extend the entity to any data shape as long as the pk/sk and GSI's were maintaned as desired - as there are numerous types of events.  Were I to do this it would also be prudent to add some runtime validation using something like Zod to ensure the data received is as expected.

Generally, I would add some logging and monitoring and perhaps slightly more robust error handling.  I've never used Nest before but it seemed a good way to quickly spin up a backend with some useful bells and whistles (e.g. typeorm integration) to iterate quickly and delegate some thinking time away to a more opinionated structure.




