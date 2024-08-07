import axios from "axios";
import { toast } from "react-toastify";

export const uploadImage = async event => {
    let toastId = null;

    const image = await getImage(event);
    if (!image) return null;

    // Construye un conjunto de pares clave/valor
    const formData = new FormData();
    formData.append('image', image, image.name);

    const response = await axios.post('api/upload', formData, {
        onUploadProgress: ({ progress }) => {
            if (toastId) toast.update(toastId, { progress });
            else toastId = toast.success('Uploading...', { progress });
        }
    });
    toast.dismiss(toastId);

    return response.data.imageUrl;
};

const getImage = async event => {
    const files = event.target.files;

    if (!files || files.length <= 0) {
        toast.warning('You must select a file', 'File Upload');
        return null;
    }

    const file = files[0];

    // if(file.type !== 'image/jpeg'){
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error('Only JPG and PNG types are allowed', 'File Type Error');
        return null;
    }

    return file;
}
