# SocialNetwork ![GitHub last commit](https://img.shields.io/github/last-commit/Yowks/API-social-networks)

This is an event API Rest - Facebook like
<br>

## Installation

Use `git clone` to install this app.

```bash
git clone https://github.com/Yowks/API-social-networks.git
npm install
```

## Usage

```bash
node app.js
```

## Endpoints
Base URL: `http://localhost:3000/`

## Database 

DB : Cluster connection to Atlas
<br>

### Users :

| Method | Endpoint            | Usage                              | Return        |
|--------|---------------------|------------------------------------|---------------|
| GET    | `/user/search` | Get all users | user |
| GET    | `/user/{id}` | Get one user | user |
| POST    | `/user/create` | Create an user | user |
| PUT    | `/user/{id}/update` | Edit an user | user |
| Delete    | `/user/{id}/delete` | Delete an user | boolean |



### Events :

| Method | Endpoint            | Usage                              | Return        |
|--------|---------------------|------------------------------------|---------------|
| GET    | `/event/search` | Get all events | event |
| GET    | `/event/{id}` | Get one event | event |
| POST    | `/event/create` | Create an event | event |
| PUT    | `/event/{id}/update` | Edit an event | event |
| Delete    | `/event/{id}/delete` | Delete an event | boolean |


### Groups :

| Method | Endpoint            | Usage                              | Return        |
|--------|---------------------|------------------------------------|---------------|
| GET    | `/group/search` | Get all groups | group |
| GET    | `/group/{id}` | Get one group | group |
| POST    | `/group/create` | Create a group | group |
| PUT    | `/group/{id}/update` | Edit a group | group |
| Delete    | `/group/{id}/delete` | Delete a group | boolean |

### Discussions :

| Method | Endpoint            | Usage                              | Return        |
|--------|---------------------|------------------------------------|---------------|
| GET    | `/discussion` | Get all discussions | discussions |
| GET    | `/discussion/{id}` | Get one discussion | discussion |
| POST    | `/discussion/create` | Create a discussion | discussion |
| PUT    | `/discussion/{id}/update` | Edit a discussion | discussion |
| Delete    | `/discussion/{id}/delete` | Delete a discussion | boolean |
| GET    | `/discussion/{id}/message` | Get all messages from a discussion | messages |


### Messages :

| Method | Endpoint            | Usage                              | Return        |
|--------|---------------------|------------------------------------|---------------|
| GET    | `/message` | Get all messages | messages |
| GET    | `/message/{id}` | Get one message | message |
| POST    | `/message/create` | Create a message | message |
| PUT    | `/message/{id}/update` | Edit a message | message |
| Delete    | `/message/{id}/delete` | Delete a message | boolean |
| GET    | `/message/{id}/comment` | Get all comments from a message | comments |


### Comments :

| Method | Endpoint            | Usage                              | Return        |
|--------|---------------------|------------------------------------|---------------|
| GET    | `/comment` | Get all comments | comments |
| GET    | `/comment/{id}` | Get one comment | comment |
| POST    | `/comment/create` | Create a comment | comment |
| PUT    | `/comment/{id}/update` | Edit a comment | comment |
| Delete    | `/comment/{id}/delete` | Delete a comment | boolean |


### Albums :

| Method | Endpoint            | Usage                              | Return        |
|--------|---------------------|------------------------------------|---------------|
| GET    | `/album` | Get all albums | albums |
| GET    | `/album/{id}` | Get one album | album |
| POST    | `/album/create` | Create a album | album |
| PUT    | `/album/{id}/update` | Edit a album | album |
| Delete    | `/album/{id}/delete` | Delete a album | boolean |
| GET    | `/album/{id}/picture` | Get all pictures in album | pictures |
| GET    | `/album/{id}/picture/{pic_id}/comment` | Get all comments of a picture in album | comments |
| POST    | `/album/{id}/picture/create` | Create a picture in album | picture |
| PUT    | `/album/{id}/picture/update` | Edit a picture in album | picture |
| Delete    | `/album/{id}/picture/delete` | Delete a picture in album | boolean |
