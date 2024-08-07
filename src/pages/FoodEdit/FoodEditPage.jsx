import { useNavigate, useParams } from 'react-router-dom';
import classes from './foodEditPage.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/foodService.js';
import Title from '../../components/Title/Title.jsx';
import InputContainer from '../../components/InputContainer/InputContainer.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { uploadImage } from '../../services/uploadService.js';
import { toast } from 'react-toastify';

function FoodEditPage() {

    const { foodId } = useParams();
    // !!foodId : convierte foodId a su booleano equivalente
    // !!123 : true
    // !!null : false
    const isEditMode = !!foodId;
    const [imageUrl, setImageUrl] = useState();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        if (!isEditMode) return;

        getById(foodId)
            .then(food => {
                if (!food) return;
                reset(food);
                setImageUrl(food.imageUrl);
            })
    }, [foodId]);

    const submit = async foodData => {
        const food = { ...foodData, imageUrl };

        if (isEditMode) {
            await update(food);
            toast.success(`Food ${food.name} updated successfully`);
            return;
        }

        // Crear food
        const newFood = await add(food);
        toast.success(`Food ${newFood.name} added successfully`);
        navigate('/admin/editFood/' + newFood.id, { replace: true });
    }

    const upload = async event => {
        setImageUrl(null);
        const imageUrlResponse = await uploadImage(event);
        setImageUrl(imageUrlResponse);
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title={isEditMode ? 'Edit Food' : 'Add Food'} />
                <form
                    onSubmit={handleSubmit(submit)}
                    noValidate
                    className={classes.form}
                >
                    <InputContainer label='Select Image'>
                        <input type='file' onChange={upload} accept='image/jpeg, image/jpg, image/png, image/webp' />
                    </InputContainer>

                    {
                        imageUrl && (
                            <a
                                href={imageUrl}
                                className={classes.image_link}
                                target='blank'
                            >
                                <img src={imageUrl} alt='Uploaded' />
                            </a>
                        )
                    }

                    <Input
                        type='text'
                        label='Name'
                        {...register('name', {
                            required: true,
                            minLength: 5
                        })}
                        error={errors.name}
                    />

                    <Input
                        type='number'
                        label='Price'
                        {...register('price', {
                            required: true
                        })}
                        error={errors.price}
                    />

                    <Input
                        type='text'
                        label='Tags'
                        {...register('tags')}
                        error={errors.tags}
                    />

                    <Input
                        type='text'
                        label='Origins'
                        {...register('origins', {
                            required: true
                        })}
                        error={errors.origins}
                    />

                    <Input
                        type='text'
                        label='Cook Time'
                        {...register('cookTime', {
                            required: true
                        })}
                        error={errors.cookTime}
                    />

                    <Button
                        type='submit'
                        text={isEditMode ? 'Update' : 'Create'}
                    />
                </form>
            </div>
        </div>
    )
}

export default FoodEditPage