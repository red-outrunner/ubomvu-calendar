package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
)

type Event struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"end_time"`
}

var events = make(map[string]Event)

func main() {
	router := gin.Default()

	router.POST("/events", createEvent)
	router.GET("/events", getAllEvents)
	router.GET("/events/:id", getEvent)
	router.PUT("/events/:id", updateEvent)
	router.DELETE("/events/:id", deleteEvent)

	router.Use(cors.Default())
	router.Run(":8080")
}

func createEvent(c *gin.Context) {
	var newEvent Event
	if err := c.ShouldBindJSON(&newEvent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newEvent.ID = fmt.Sprintf("%d", time.Now().UnixNano())
	events[newEvent.ID] = newEvent

	c.JSON(http.StatusCreated, newEvent)
}

func getAllEvents(c *gin.Context) {
	eventList := make([]Event, 0, len(events))
	for _, event := range events {
		eventList = append(eventList, event)
	}
	c.JSON(http.StatusOK, eventList)
}

func getEvent(c *gin.Context) {
	id := c.Param("id")
	event, exists := events[id]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
		return
	}
	c.JSON(http.StatusOK, event)
}

func updateEvent(c *gin.Context) {
	id := c.Param("id")
	_, exists := events[id]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
		return
	}

	var updatedEvent Event
	if err := c.ShouldBindJSON(&updatedEvent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedEvent.ID = id
	events[id] = updatedEvent

	c.JSON(http.StatusOK, updatedEvent)
}

func deleteEvent(c *gin.Context) {
	id := c.Param("id")
	_, exists := events[id]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
		return
	}

	delete(events, id)
	c.JSON(http.StatusOK, gin.H{"message": "Event deleted successfully"})
}
