package main

import (
    "encoding/json"
    "io/ioutil"
    "net/http"
    "os"
    "github.com/gin-gonic/gin"
)

// Define structures for events and todos
type Event struct {
    Title   string `json:"title"`
    Date    string `json:"date"`
    Details string `json:"details"`
}

type Todo struct {
    Task     string `json:"task"`
    DueDate  string `json:"dueDate"`
    Reminder bool   `json:"reminder"`
}

// File paths for storing events and todos
var eventFile = "events.json"
var todoFile = "todos.json"

func main() {
    r := gin.Default()

    // Serve static files (CSS, JS)
    r.Static("/static", "./static")

    // Serve the index.html file
    r.GET("/", func(c *gin.Context) {
        c.File("./static/index.html")
    })

    // API routes for events and todos
    r.GET("/api/events", getEvents)
    r.POST("/api/events", addEvent)
    r.GET("/api/todos", getTodos)
    r.POST("/api/todos", addTodo)

    // Start the server
    r.Run(":8080")
}

// Helper function to read JSON from a file
func readFromFile(filename string, data interface{}) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close()

    bytes, err := ioutil.ReadAll(file)
    if err != nil {
        return err
    }

    return json.Unmarshal(bytes, data)
}

// Helper function to write JSON to a file
func writeToFile(filename string, data interface{}) error {
    bytes, err := json.MarshalIndent(data, "", "  ")
    if err != nil {
        return err
    }

    return ioutil.WriteFile(filename, bytes, 0644)
}

// Fetch events from the file
func getEvents(c *gin.Context) {
    var events []Event
    err := readFromFile(eventFile, &events)
    if err != nil && !os.IsNotExist(err) {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read events"})
        return
    }
    c.JSON(http.StatusOK, events)
}

// Add a new event
func addEvent(c *gin.Context) {
    var newEvent Event
    if err := c.ShouldBindJSON(&newEvent); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    var events []Event
    readFromFile(eventFile, &events)
    events = append(events, newEvent)

    if err := writeToFile(eventFile, events); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save event"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Event added"})
}

// Fetch todos from the file
func getTodos(c *gin.Context) {
    var todos []Todo
    err := readFromFile(todoFile, &todos)
    if err != nil && !os.IsNotExist(err) {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read todos"})
        return
    }
    c.JSON(http.StatusOK, todos)
}

// Add a new todo
func addTodo(c *gin.Context) {
    var newTodo Todo
    if err := c.ShouldBindJSON(&newTodo); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    var todos []Todo
    readFromFile(todoFile, &todos)
    todos = append(todos, newTodo)

    if err := writeToFile(todoFile, todos); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save todo"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "To-Do added"})
}

