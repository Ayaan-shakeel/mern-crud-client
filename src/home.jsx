import React, {useState } from 'react'
// only import what you want to use
import {
    Button,
    Checkbox,
    FileInput,
    Label,
    Radio,
    RangeSlider,
    Select,
    Textarea,
    TextInput,
    ToggleSwitch,
} from "flowbite-react";
import EnquiryList from './enquiry/enquiryList';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'



export default function Home() {
   let[enquiryList,setEnquiryList]=useState([])
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        _id:''
    })



    let saveEnquiry = (e) => {
        e.preventDefault()
        // let formData = {
        //     name: e.target.name.value,
        //     email: e.target.email.value,
        //     phone: e.target.phone.value,
        //     message: e.target.message.value,
        // }
        if(formData._id){
            axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`,formData)
            .then((res)=>{
                toast.success("Enquiry Updated Successfully")
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    _id:''
                })
                getAllEnquiry()
            })

        }
        else{

            axios.post('http://localhost:8020/api/website/enquiry/insert', formData).then((res) => {
                console.log(res.data)
                toast.success("Enquiry Saved Successfully")
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                })
                getAllEnquiry()
                
            })
        }
    }

 
let getAllEnquiry=()=>{
    axios.get('http://localhost:8020/api/website/enquiry/view')
    .then((res)=>{
        return res.data

    })
    .then((finalData)=>{
        if(finalData.status){
            setEnquiryList(finalData.enquiryList)
        }
    })
}

  

    let getValue = (e) => {
        let InputName = e.target.name
        let InputValue = e.target.value
        let oldData = { ...formData }
        oldData[InputName] = InputValue
        setFormData(oldData)
    }



useEffect(()=>{
    getAllEnquiry()
  },[]);
    return (
        <div>
            <ToastContainer />
            <h1 className='text-[30px] text-center py-2  font-bold'>User Enquiry By Ayaan</h1>
            <div className='grid grid-cols-[30%_auto] rounded-full gap-10 '>
                <div className='bg-gray-200 py-4'>
                    <h2 className='text-[20px] text-center py-4 font-bold'>Enquiry Form</h2>
                    <form action="" onSubmit={saveEnquiry}>
                        <div className='bg-white-200 py-3 rounded-full'>
                            <Label htmlFor='name' value="Your Name" />
                            <TextInput type='text' value={formData.name} onChange={getValue} name='name' placeholder='Enter Your Name' required />
                        </div>

                        <div className='bg-white-200 py-3'>
                            <Label htmlFor='email' value="Your Email" />
                            <TextInput type='text' value={formData.email} onChange={getValue} name='email' placeholder='Enter Your Email' required />
                        </div>
                        <div className='bg-white-200 py-3'>
                            <Label htmlFor='phone' value="Your Phone Number" />
                            <TextInput type="text" value={formData.phone} onChange={getValue} name='phone' placeholder='Enter Your Phone No' required />

                        </div>
                        <div className='bg-white-200 py-3'>
                            <Label htmlFor='Message' value="Message" />
                            <Textarea value={formData.message} onChange={getValue} name='message' placeholder='Message .............' required rows={4} aria-required={10} />
                        </div>
                        <div className='py-3'>
                            <Button type='submit' className='w-[100%]'>
                                {formData._id ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </div>
                <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} Swal={Swal} setFormData={setFormData} />

            </div>
        </div>
    )
}




