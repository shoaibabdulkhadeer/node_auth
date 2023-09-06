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
    emp_id: {
        type: SchemaTypes.String,
        required: true,
      },
    dept: {
        type: SchemaTypes.String,
        required: true
    },
    uname: {
        type: String,
        required: true,
        unique: true, // Ensure unique usernames
      },
    pwd: {
        type: SchemaTypes.String,
        required: true
    },
    comm_email: {
        type: String,
        required: true,
    },
    roles: [roleSchema],
    active: {
        type: Boolean,
        required: true,
      },
},{timestamps: true})


const UserAccount = model('userAccounts', userSchema)

export { UserAccount }