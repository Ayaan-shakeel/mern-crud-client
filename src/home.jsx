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
            axios.put(`https://mern-crud-server-a19z.onrender.com/api/website/enquiry/update/${formData._id}`,formData)
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

            axios.post('https://mern-crud-server-a19z.onrender.com/api/website/enquiry/insert', formData).then((res) => {
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
    axios.get('https://mern-crud-server-a19z.onrender.com/api/website/enquiry/view')
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
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
  <ToastContainer />

  <div className="mx-auto max-w-7xl">
    <h1 className="text-center text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
      User Enquiry By Ayaan
    </h1>

    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 xl:gap-8">
      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-6 text-center text-xl font-bold text-slate-800 sm:text-2xl">
            Enquiry Form
          </h2>

          <form action="" onSubmit={saveEnquiry} className="space-y-5">
            <div>
              <div className="mb-2">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput
                type="text"
                value={formData.name}
                onChange={getValue}
                name="name"
                placeholder="Enter Your Name"
                required
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-2">
                <Label htmlFor="email" value="Your Email" />
              </div>
              <TextInput
                type="text"
                value={formData.email}
                onChange={getValue}
                name="email"
                placeholder="Enter Your Email"
                required
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-2">
                <Label htmlFor="phone" value="Your Phone Number" />
              </div>
              <TextInput
                type="text"
                value={formData.phone}
                onChange={getValue}
                name="phone"
                placeholder="Enter Your Phone No"
                required
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-2">
                <Label htmlFor="message" value="Message" />
              </div>
              <Textarea
                value={formData.message}
                onChange={getValue}
                name="message"
                placeholder="Message ............."
                required
                rows={4}
                aria-required={10}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 sm:text-base"
              >
                {formData._id ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <EnquiryList
          data={enquiryList}
          getAllEnquiry={getAllEnquiry}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  </div>
</div>
    )
}




