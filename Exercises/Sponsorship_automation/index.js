require('dotenv').config()
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
var xlsx = require('node-xlsx');
const sgMail = require('@sendgrid/mail');
var fs=require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    var obj = xlsx.parse(__dirname + '/HackVITSponsorship.xlsx');
    console.log(obj[0].data.length);
    var a=[];
    obj[0].data.map((element)=>{
        if(element[3]!=null && element[0]!=null)
         {
            var name=element[2];
             if(element[2].includes('('))
              {
                  name=element[2].substr(0,element[2].indexOf('('));
              }
             a.push({
                 email: element[3],
                 name: name,
                 companyName: element[0]
             });
         }
    });
    console.log(a.length);
    a.shift();
    res.send(a);
});

app.get('/test', (req,res)=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'fkjainco@gmail.com',
        from: 'fkjainco@gmail.com',
        subject: 'HACKVIT',
        text: 'Hey! Fenil This is Neil. Kaha hai itne dino se?',
        html: "<!doctype html><html><head><meta charset='utf-8'></head><body><p>Respected Fenil,</p><p>We are humbled to invite "+element.companyName+", a brand that embodies the true zest of innovation and inspires others through its journey, to one of the largest international hackathons in India, VITHack, on the 20th till 22nd of September, in the hopes of stimulating a culture of curiosity and innovation in the youth.</p><p>VIT Hack is a 36 hour hackathon expecting over 500 participants from thousands of universities all over the world. These students will revolutionize solutions to real world problems from various tracks with a focus on feasibility, functionality, resourcefulness and sustainability allowing them to pioneer new technologies and channel their ideas into impactful change. </p><p>This is why we would like to associate with "+element.companyName+" as our case partners to bring forth the most paramount challenges faced by you and give an opportunity to the sharpest and finest minds to brainstorm and solve them.</p><p>The details of this collaboration are specified in the brochure attached.</p><p>For further details, feel free to contact us and we look forward to working with you. </p><p>We are sure that VIT Hack and "+element.companyName+" together can create an atmosphere bristling with creative innovations.</p><p>Warm Regards,</br>VITHack Collaborations Team</br>"+"Fenil"+"</p></body></html>",
    };
    sgMail.send(msg).catch((err)=>{
        res.send(err);
    });
    res.send("Done!");
});

app.get('/testfs',(req,res)=>{
        var obj = xlsx.parse(__dirname + '/HackVITSponsorship.xlsx');
        console.log(obj[0].data.length);
        var a=[];
        obj[0].data.map((element)=>{
            if(element[3]!=null && element[0]!=null)
            {
                var name=element[2];
                if(element[2].includes('('))
                {
                    name=element[2].substr(0,element[2].indexOf('('));
                }
                a.push({
                    email: element[3],
                    name: name,
                    companyName: element[0]
                });
            }
        });
        a.shift();
        var d;
        a=[
            {
                name: "Fenil",
                email: 'fkjainco@gmail.com',
                companyName: "Fk's"
            }
        ];
        a.map((element)=>{
            console.log(element);
            fs.readFile('./CollaborationsBrochure.pdf',(err,file)=>{
                if(!err)
                {
                    console.log(element);
                    console.log("Entered!");
                    var base64File = new Buffer.from(file).toString('base64');
                    d=file;
                    const msg={
                        to          : element.email,
                        from        : 'collaborations@vithack.com',
                        subject     : 'Request for colloboration',
                        html        : "<!doctype html><html><head><meta charset='utf-8'></head><body><p>Respected "+element.name+",</p><p>We are humbled to invite "+element.companyName+", a brand that embodies the true zest of innovation and inspires others through its journey, to one of the largest international hackathons in India, VITHack, on the 20th till 22nd of September, in the hopes of stimulating a culture of curiosity and innovation in the youth.</p><p>VIT Hack is a 36 hour hackathon expecting over 500 participants from thousands of universities all over the world. These students will revolutionize solutions to real world problems from various tracks with a focus on feasibility, functionality, resourcefulness and sustainability allowing them to pioneer new technologies and channel their ideas into impactful change. </p><p>This is why we would like to associate with "+element.companyName+" as our case partners to bring forth the most paramount challenges faced by you and give an opportunity to the sharpest and finest minds to brainstorm and solve them.</p><p>The details of this collaboration are specified in the brochure attached.</p><p>For further details, feel free to contact us and we look forward to working with you. </p><p>We are sure that VIT Hack and "+element.companyName+" together can create an atmosphere bristling with creative innovations.</p><p>Warm Regards,</br>VITHack Collaborations Team</br>Fenil</p></body></html>"
                        /*attachments : [{
                            filename: 'CollaborationsBrochure.pdf', 
                            content: base64File,
                            // type: 'application/pdf',
                            // disposition: 'attachment',
                            // contentId: 'myId'
                        }]*/
                    };
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    sgMail.send(msg).then(console.log).catch(err=>res.send(err));
                }
                else
                {
                    res.send("Error!");
                }
            });
        });
        res.send("Done!");
});

app.listen(8010,(err)=>{
    if(!err)
     {
        console.log("Listening on port 8010");
     }
});