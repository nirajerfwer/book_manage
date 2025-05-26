import mongoose,{Schema,Document,Model, mongo} from "mongoose";

interface IBooks extends Document{
    title:string,
    author:string,
    genre:string,
    published:Date,
    createdAt?: Date; 
  updatedAt?: Date;
}

const BooksSchema:Schema = new Schema({
    title:{type:String,require:true},
    author:{type:String,require:true},
    genre:{type:String,require:true},
    published:{type:String,require:true},
}, {
  timestamps: true  // 👈 this adds createdAt and updatedAt
})

const BooksModel:Model<IBooks> = mongoose.model<IBooks>("Books",BooksSchema);
export default BooksModel;