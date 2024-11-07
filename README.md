# poe-part-3This README outlines the changes and enhancements made in Part 3 of the application development project. The focus of this phase was to complete the user interface and integrate essential features, ensuring a fully functional and user-friendly experience for both chefs and users.
Changes Made
User Interface Completion
In Part 3, two primary screens were developed:
1.	Home Page
o	Displays the total number of items in the menu.
o	Lists all dishes along with average prices per category.
o	Allows chefs to manage dishes directly from this screen.
2.	Add Dish Page
o	Enables chefs to input new dish details including:
	Dish Name
	Description
	Price
	Course Selection (category)
Key Features Implemented
•	Dish Details Entry:
o	Chefs can enter dish names, descriptions, and prices.
o	A Picker component allows selection from predefined course options (e.g., starters, mains, desserts).
•	Dynamic Content on Home Screen:
o	The home screen dynamically updates to reflect the total number of menu items.
o	Average prices are calculated and displayed per course/category.
o	Lists all added dishes, enabling chefs to easily view and manage their offerings.
Navigation and Linking
•	Page Connections:
o	A button on the Home Page navigates to the Add Dish Page.
o	Once a dish is added, the Home Page updates dynamically to reflect changes using state management and navigation parameters.
•	Remove Functionality:
o	Chefs can remove dishes directly from the Home Page, with real-time updates to the displayed list.
Fulfillment of Part 2 & 3 Dependencies
•	Continuation from Part 2:
o	This phase builds upon the previous work by:
	Displaying a comprehensive list of dishes on the Home Page.
	Allowing dynamic updates to the menu as new dishes are added.
	Providing user feedback through alerts when items are added or removed.
•	Completion for Part 3:
o	The code ensures that the user interface is fully functional and integrates all features smoothly, meeting the requirements of the PoE.

