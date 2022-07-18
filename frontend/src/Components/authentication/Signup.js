import React,{useState} from 'react'
import { useToast } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import {Input} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout'
import { Button ,InputGroup,InputRightElement} from '@chakra-ui/react';
import { urlencoded } from 'express';
const Signup = () => {
    const [show,setShow] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmpassword,setConfirmpassword] = useState();
    const [pic,setPic] = useState();
    const [isloading,setLoading] = useState();
    const toast = useToast();
    const handleClick = () =>setShow(!show);
    const submitHandler = () => {};
    const postDetails =(pics)=>{
         setLoading(true)
         if(pic===undefined){

        toast({
          title: 'Please select an image',
          
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position :"bottom"
        });
        return;
      }

  
if(pics.type === "image/jpeg"|| pics.type === "image/png"){
    const data = new FormData();
    data.append("file",pics);
    data.append("upload_preset","ChatApp")
    data.append("cloud_name","vijendranagar");
    fetch("https://api.cloudinary.com/v1_1/vijendranagar/image/upload",{
        method:'post',
        body:'data',
     }).then((res)=>res.json())
       .then(data=>{
        setPic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false);
       })
       .catch((err)=>{
        console.log(err);
        setLoading(false);
       })
    }
         else{
             toast({
          title: 'Please select an image',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position :"bottom"
        });
       setLoading(false);
        return;
      }
    
}
return(
    <VStack spacing='5px'>
        <FormControl id ='first-name' isRequired>
            <FormLabel>
name
            </FormLabel>
            <Input
            placeholder='Enter Your Name  '
            onChange ={(e)=>setName(e.target.value)}/>
        </FormControl>
         <FormControl id ='email' isRequired>
            <FormLabel>
Email
            </FormLabel>
            <Input
            placeholder='Enter Your Email '
            onChange ={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        <FormControl id ='password' isRequired>
            <FormLabel>
password
            </FormLabel> 
            <InputGroup>
            <Input
            type = {show ? "text":"password"}
            placeholder='Enter Your Password '
            onChange ={(e)=>setPassword(e.target.value)}/>
            <InputRightElement width = "4.5rem">
                <Button h="1.75rem" size ="sm" onClick={handleClick}>
                    {show ? "Hide":"Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id ='confirmpassword' isRequired>
            <FormLabel>
cofirm password
            </FormLabel> 
            <InputGroup>
            <Input
            type = {show ? "text":"password"}
            placeholder='confirm password'
            onChange ={(e)=>setConfirmpassword(e.target.value)}/>
            <InputRightElement width = "4.5rem">
                <Button h="1.75rem" size ="sm" onClick={handleClick}>
                    {show ? "Hide":"Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
         <FormControl id ='pic'>
            <FormLabel>
Upload your picture
            </FormLabel>
            <Input
            type = "file"
            p={1.5}
            accept = "image/*"
            onChange ={(e)=>postDetails(e.target.file[0])}/>
        </FormControl>
        <Button 
        colorScheme="blue"
        width = "100%"
        style ={{marginTop:15}}
        onClick ={submitHandler}
        isloading = {isloading}>Sign Up</Button>
    </VStack>
  );
};

export default Signup;