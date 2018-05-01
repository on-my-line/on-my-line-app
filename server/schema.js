const fetch = require('node-fetch')

const API_KEY = process.env.MEETUP_API_KEY
const { GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList } = require('graphql')

const EventType = new GraphQLObjectType({
    name: 'Event',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: res => res.name
        }
    })
})

const MeetupType = new GraphQLObjectType({
    name: 'Meetup',
    description: '...',
    fields: () => ({
        events: {
            type: new GraphQLList(EventType),
            resolve: json => {
                console.log(json.results)
                return json.results
            }
        }
    })
})

module.exports = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            description: '...',
    
            fields: () => ({
                meetup: {
                    type: MeetupType,
                    args: {
                        longitude: {type: GraphQLString },
                        latitude: {type: GraphQLString},
                        radius: {type: GraphQLString},
                        API_KEY: {type: GraphQLString}
                    },
                    resolve: (root, args) => fetch(
                        `https://api.meetup.com/2/concierge?lon=${args.longitude}&lat=${args.latitude}&radius=${args.radius}&key=${args.API_KEY}`
                    )
                    .then(response => response.json())
                    //function that graphQL uses to fetch and acquire the data
                }
            })
        })
    })