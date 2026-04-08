import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            Title: post?.Title || "",
            slug: post?.slug || post?.$id || "",
            Content: post?.Content || "",
            Status: post?.Status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;

            if (file) {
                appwriteService.deleteFile(post.FeaturedImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                Title: data.Title,
                Content: data.Content,
                FeaturedImage: file ? file.$id : post.FeaturedImage,
                Status: data.Status,
            });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const dbPost = await appwriteService.createPost({
                    Title: data.Title,
                    slug: data.slug,
                    Content: data.Content,
                    FeaturedImage: file.$id,
                    Status: data.Status,
                    UserId: userData.$id,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "Title") {
                setValue("slug", slugTransform(value.Title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)}>

            {/* 🔥 Main Card */}
            <div className="bg-gray-300 rounded-2xl shadow-md p-6 md:p-8">

                <div className="flex flex-col md:flex-row gap-6">

                    {/* LEFT SIDE */}
                    <div className="w-full md:w-2/3 space-y-5">

                        <Input
                            label="Title"
                            placeholder="Enter post title"
                            {...register("Title", { required: true })}
                        />

                        <Input
                            label="Slug"
                            placeholder="Auto-generated slug"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />

                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-700">
                                Content
                            </p>
                            <RTE
                                name="Content"
                                control={control}
                                defaultValue={getValues("Content")}
                            />
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full md:w-1/3 space-y-5">

                        <Input
                            label="Featured Image"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />

                        {post && (
                            <div className="w-full">
                                <p className="text-sm mb-2 text-gray-700">Current Image</p>
                                <img
                                    src={appwriteService.getFilePreview(post.FeaturedImage)}
                                    alt={post.Title}
                                    className="rounded-lg w-full h-40 object-cover"
                                />
                            </div>
                        )}

                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            {...register("Status", { required: true })}
                        />

                        <Button
                            type="submit"
                            className={`w-full text-white rounded-full py-2 transition ${
                                post
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-600 hover:bg-gray-700"
                            }`}
                        >
                            {post ? "Update Post" : "Create Post"}
                        </Button>

                    </div>

                </div>
            </div>

        </form>
    );
}