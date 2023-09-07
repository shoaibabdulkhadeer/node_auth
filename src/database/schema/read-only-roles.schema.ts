import { Schema, SchemaTypes, model } from "mongoose";


const readOnlyRoleSchema = new Schema({
    rid:{
        type: SchemaTypes.Number,
        required: true,
    },	
	rname:{
        type: SchemaTypes.String,
        required: true,
 
    }		
})
const ReadOnlyRoles = model("readonlyroles", readOnlyRoleSchema)