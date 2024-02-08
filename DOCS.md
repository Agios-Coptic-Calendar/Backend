# Agios Calendar Backend Documentation
This is the backend for the Agios Coptic Calendar. It is a RESTful API that provides the calendar data in JSON format. The data is based on the Coptic Orthodox Church's calendar.

## Routes and Endpoints
The API has the following routes and endpoints:
    * **/occassions/getAll** - Returns all the occassions in the coptic calendar
    * **/occassions/get/:id** - Returns the occassion with the specified id

## Data Structure

### Occassions
An occassion is a special event in the coptic calendar. It has the following properties:
    * **created** - The date the occassion was created
    * **date**: - The gregorian calendar date of the occassion
    * **copticDate** - The coptic calendar date of the occassion,
    * **icons** - A list of icons that represent the occassion,
    * **stories** - A list of stories that are associated with the occassion,
    * **facts** - A list of facts about the occassion,
    * **id** - A unique identifier for the occassion,
    * **liturgicalInformation** - A human friendly description of what occurs on the occassion,
    * **name** - A human friendly name for the occassion,
    * **updated** - The date the occassion was last updated

### Icons
An icon is an image that represents what happened on a particular occassion. It has the following properties:
    * **caption** - A human friendly description of what is depicted in the icon,
    * **created** - The date the icon was created,
    * **croppedImage** - A cropped version of the icon for 1:1 aspect ratio (Widgets, thumbnails, etc),
    * **explanation** - An explanation of the icon,
    * **iconagrapher** - The person who illustrated the icon,
    * **id** - a unique identifier for the icon,
    * **image** - A full size image of the icon,
    * **updated** - The date the icon was last updated

### Stories
A story is a narrative of a particular saint or ocassion. It has the following properties:
    * **created** - The date the story was created,
    * **highlights** - A list of highlights from the story,
    * **id** - A unique identifier for the story,
    * **saint** - The saint the story is about,
    * **story** - The story itself,
    * **updated** - The date the story was last updated

### Facts and Highlights
The Facts and Highlights have a very similar structure. They both have the following properties:
    * **id** - A unique identifier for the fact or highlight,
    * **created** - The date the fact or highlight was created,
    * **updated** - The date the fact or highlight was last updated,
    * **fact** - The fact itself (Only for facts),
    * **highlight** - The highlight itself (Only for highlights)