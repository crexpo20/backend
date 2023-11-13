import React ,{useState}from 'react';
import { Container, FormGroup, Input } from 'reactstrap';
const Subir = ({ onImageChange }) => {
    const [image, setimage] = useState("");
    const [loading, setLoading] = useState(false);
    const containerStyles = {
        
        
       
        height: '5%',
      };
     const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file",files[0]);
        data.append("upload_preset","telosSuite2023");
        setLoading(true);
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dra6e6bat/image/upload",
            {
                method:"POST",
                body: data,
               
            }
        )
            const file= await res.json();
            console.log(file.secure_url)
            setimage(file.secure_url)
            setLoading(false)
            onImageChange(file.secure_url);
            
     }


    return(
     <div>
        <Container style={containerStyles}>
          <FormGroup>
            <Input
             type='file'
             name='file'
             className='input-img'
             placeholder="sube tu imagen"
             onChange={uploadImage}
            />
         {loading ? (<h3>SUBIENDO IMAGEN</h3>) : ("")}
          </FormGroup>     
        </Container>
        
     </div>   
    )
}

export default Subir;

