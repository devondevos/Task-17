To start the server the user has to open command prompt and direct the folder to the cmd e.g cd file-name.

Then once the server is running, you should open postman and copy the api on to postman e.g localhost:8080/api.
After that has been done you must select GET on postman and press the send button to see the data being displayed in the file.

Then for the POST function you must change the get to post in the dropdown on postman, then enter in the query params under the key and value columns on postman a new id, title, description and URL to whatever you like to see added to the json file.

For the DELETE function in the key column type id and choose which id to delete from the file and the id and all of it's contents will be deleted.

Finally for the PUT function you have to add some wording to the api for example http://localhost:8080/api/1/?/title=
After api and the slash is the id number that you can choose to  post and upadate and you can choose which you part you want to update the title and description after the slash and question mark is where you type in the title or description and after the equal to sign you have to type in whatever you want the description or the title to be.  