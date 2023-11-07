import Swal from 'sweetalert2'
import { deleteRequest } from '../APIrequest/APIrequest'

export function deleteTask(id){
    return Swal.fire({
        title:"Are you Sure?",
        text:"You won't be able to revert this!",
        icon:"warning",
        showCancelButton:true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
        if(result.isConfirmed){
            return deleteRequest(id).then((delResult)=>{
                return delResult
            })
        }
        
    })
}