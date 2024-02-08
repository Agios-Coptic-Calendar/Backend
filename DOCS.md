# Agios Calendar Backend Documentation
This is the backend for the Agios Coptic Calendar. It is a RESTful API that provides the calendar data in JSON format. The data is based on the Coptic Orthodox Church's calendar.

## Routes and Endpoints
The API has the following routes and endpoints:

* `/occasions/getAll` - Returns all the occasions in the coptic calendar
    * Sample response:
    ```json
    [
        {
            created: Date,
            date: Date,
            copticDate: CopticDate,
            icons: Icon[],
            stories: Story[],
            facts: Fact[],
            id: String,
            liturgicalInformation: String,
            name: String,
            updated: Date
        }
    ]
    ```
* `/occasions/get/:id` - Returns the occasion with the specified id
    * Sample response:
    ```json
    {
        created: Date,
        date: Date,
        copticDate: CopticDate,
        icons: Icon[],
        stories: Story[],
        facts: Fact[],
        id: String,
        liturgicalInformation: String,
        name: String,
        updated: Date
    }
    ```

## Data Structure
***Note: A Simple Schema Outline Can Be Found In The Types Folder In The Root Of The Project***
### Occasions:
* `created` - The date the occasion was created
* `date` - The gregorian calendar date of the occasion
* `copticDate` - The coptic calendar date of the occasion,
* `icons` - A list of [icons](#icons) that represent the occasion,
* `stories` - A list of [stories](#stories) that are associated with the occasion,
* `facts` - A list of [facts](#facts-and-highlights) about the occasion,
* `id` - A unique identifier for the occasion,
* `liturgicalInformation` - A human friendly description of what occurs on the occasion,
* `name` - A human friendly name for the occasion,
* `updated` - The date the occasion was last updated

### Icons:
* `caption` - A human friendly description of what is depicted in the icon,
* `created` - The date the icon was created,
* `croppedImage` - A cropped version of the icon for 1:1 aspect ratio (Widgets, thumbnails, etc),
* `explanation` - An explanation of the icon,
* `iconagrapher` - The person who illustrated the icon,
* `id` - a unique identifier for the icon,
* `image` - A full size image of the icon,
* `updated` - The date the icon was last updated

### Stories:
* `created` - The date the story was created,
* `highlights` - A list of highlights from the story,
* `id` - A unique identifier for the story,
* `saint` - The saint the story is about,
* `story` - The story itself,
* `updated` - The date the story was last updated

### Facts and Highlights:
* `id` - A unique identifier for the fact or highlight,
* `created` - The date the fact or highlight was created,
* `updated` - The date the fact or highlight was last updated,
* `fact` - The fact itself (Only for facts),
* `highlight` - The highlight itself (Only for highlights)