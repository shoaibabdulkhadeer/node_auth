import { Schema, SchemaTypes, model } from 'mongoose'

enum Roles {
    role1 = "Admin",
    role2 = "User"
}
const roleSchema = new Schema({
    rID: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    rName: {
        type: SchemaTypes.String,
        required: true,
        enum: Roles
    },
    start_ts: {
        type: SchemaTypes.Date,
        required: true,
        default: Date.now(),
    },
    end_ts: {
        type: SchemaTypes.Date,
        required: true,
    }
})



const userSchema = new Schema({
    uID: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: SchemaTypes.String,
        required: true
    },
    dept: {
        type: SchemaTypes.String,
        required: true
    },
    pwd: {
        type: SchemaTypes.String,
        required: true
    },

    roles: [roleSchema],
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
        default: Date.now(),
    },
    updatedAt: {
        type: SchemaTypes.Date,
        required: true,
    }
})


const UserAccount = model('userAccounts', userSchema)

export { UserAccount }