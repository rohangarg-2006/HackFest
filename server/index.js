const express=require('express');
const app = express();

const port=3000;
const cors=require('cors');
 const bodyParser=require('body-parser');
 app.use(cors());
 app.use(bodyParser.json());

const users=require('./Models/user')

let temp=201;
app.get('/',async(req, res)=>{
    let m=new users();
    m.name="sfadgds";
    m.phone=872687235;
    m.email=`${m.name}${temp}@cucie.com`;
    temp++;
    const x= await m.save()
    res.send(x)
})

  async function checktype(x){
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
            text: `email : ${x} . check whether this email is professional or personal or spam, just write category`
          }]
        }]
      })
    });
  
    const data = await res.json();
  
    if (data?.candidates?.length > 0) {
      return data.candidates[0]?.content?.parts[0]?.text;
    } else {
      console.log("No response from AI.");
      return null;
    }
  }

  async function run(temp) {
    const result = await checktype(temp);
    console.log(result);
  }

app.get('/send', async (req, res) => {
      let mail = {
        sender:"robin",
        reciever:"darwin",
        message:"motherfucker",
        date:"10",
        time:"4687462"
        
      };

      let x = await users.findOne({name:"robin" });
      let y = await users.findOne({name:"darwin"});
  
      if (!x || !y) {
        return res.status(404).json({ error: "Sender or receiver not found" });
      }
  
      x.sent.push(mail);
      y.received.push(mail);

    const result = await checktype(mail.message); 
  
    if (result.includes("Spam")) {
      y.spam.push(mail);
    } else if (result.includes("Personal")) {
        y.personal.push(mail);
    } else if (result.includes("Professional")) {
      y.professional.push(mail);
    }

      const first = await x.save();
      const second = await y.save();
  
      res.send({ message: "Mail sent", sender: first, receiver: second });
  
  });



app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})