import { Schema } from "mongoose";


export interface dataModel {
}
export const schema = new Schema<dataModel>({
                                         name:      { type: String, required: true },
                                         age:       { type: Number, required: true },
                                         level:     { type: Number, required: true },
                                         timestamp: { type: Number, required: true },
                                         })