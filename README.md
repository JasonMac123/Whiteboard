# Whiteboard

A website where users can create a storyboard where others can collaborate and plan.

## Description

This website application allows users to create a board that can host their storyboard and invite other users to participate and plan. The storyboard can be made with many different layer options such as notes, text, circles, triangles, and pen drawing. The layers can be rotated, height and width altered, change background colour, increase text size, change text colour, and more.

Whiteboard is built with the next.js app version to have both server side and client side rendering. The project uses typescript with the back-end built using clerk and convex. Users can register or sign up with their google accounts or their own email using clerk. Users can then create a board, access any board on their homepage dashboard, then access any board. All pages have client-side loading states while the server fetches the board data/user data through convex clerk and renders the components.

# Getting Started

### Dependencies

This project requires node.js to be installed in order to be run

### Installing

- Clone the project
- Create a liveblocks account to host the drawing room
- Create a convex account to handle back-end and authetication
- Create an environment file with Clerk, Convex, and Liveblocks keys
- Run "npm install" in the file directory
- Run "npx convex dev" to create back-end api functions
-

### Executing program

- To execute run the command "npm run dev"

## Authors

Jason mac  
[@JasonMaC](https://github.com/JasonMac123/)

## Version History

- 0.1
  - Initial Release
