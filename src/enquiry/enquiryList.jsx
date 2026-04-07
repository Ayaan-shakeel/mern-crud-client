import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EnquiryList({ data,getAllEnquiry,Swal,setFormData }) {
  let deleteRow=(delid)=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
    .then((res)=>{
      toast.success("Enquiry Deleted Successfully")
      getAllEnquiry()
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  });
}
      
    })

  }
 let editRow=(edid)=>{
  axios.get(`http://localhost:8020/api/website/enquiry/singleRow/${edid}`)
  .then((res)=>{
    let data=res.data
    setFormData(data.enquiry)
  })

 }


  return (
    <div>
      
      <div className='bg-gray-200 py-4'>

        <h2 className='text-[20px] text-center py-4 font-bold'>Enquiry List</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>S.No</TableHeadCell>
                <TableHeadCell>NAME</TableHeadCell>
                <TableHeadCell>EMAIL</TableHeadCell>
                <TableHeadCell>PHONE NO</TableHeadCell>
                <TableHeadCell>MESSAGE</TableHeadCell>
                <TableHeadCell>
                  Delete
                </TableHeadCell>
                <TableHeadCell>
                  Edit
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {
                data.length >= 1 ?
                     data.map((item, index) => {
                          return (
                            



                              <tr key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.email}</TableCell>
                              <TableCell>{item.phone}</TableCell>
                              <TableCell>{item.message}</TableCell>
                              <TableCell>
                                <button onClick={()=>{deleteRow(item._id)}} className='bg-red-500 cursor-pointer text-white rounded-md py-1 px-4'>Delete</button>
                              </TableCell>
                              <TableCell>
                                <button onClick={()=>{editRow(item._id)}} className='bg-blue-500 text-white rounded-md py-1 px-4 cursor-pointer'>Edit</button>
                              </TableCell>
                            </tr>
                          )

                        
                          })
                          :

                            <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <TableCell colSpan={7} className='text-center'>No Data Found</TableCell>
                            </TableRow>
                    }




            </TableBody>
          </Table>
        </div>

      </div>

    </div>
  )
}



