# Part_2
contains: a) Rendering a collection, modules. b) Forms. c) Getting data from server. d) Altering data in server. e) Adding styles to React app


I have feedback for exercises 2.18-2.20. The API for the countries list (https://restcountries.com/v3.1/all) has updated to v3.1 as opposed to v2 when this problemset was initially posted.

Because of this, the object structure has changed. Instead of their simply being a country name, under the name of the country, 
there are now multiple nested objects for common name and official name (I think there are even more options)
There is also a change with how the names in the object are structured. Instead of each language having a key of "name" there is now a key that is an 
abbreviation of the name of the langauge. Because of this you can't simply access the langauges of the country by following the nested objects to its end point. 

I think the course should either give the link to the old v2 API of the countries to keep it consistent OR make small mentions and hints throught the exercieses
EX: "It's ok to just search by common name" or "Hint: languages may need to be turned into just the values of the object (remember React doesn't render object children!)"

I prefer the later option (keeping https://restcountries.com/v3.1/all) as I think I came away with great problemsolving skills 
but figuring out displaying the countries and langauges was difficult as a new programmer without a least some warning. 

 
