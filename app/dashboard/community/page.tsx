"use client";

import { useState, useEffect } from "react";
import { databases, DATABASE_ID, COLLECTIONS } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface Post {
  $id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  tags: string[];
}

interface Comment {
  $id: string;
  content: string;
  userId: string;
  createdAt: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.$id);
    }
  }, [selectedPost]);

  const fetchPosts = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.FORUM_POSTS,
        [Query.orderDesc("createdAt")]
      );
      const posts: Post[] = response.documents.map((doc: any) => ({
        $id: doc.$id,
        title: doc.title,
        content: doc.content,
        userId: doc.userId,
        createdAt: doc.createdAt,
        tags: doc.tags,
      }));
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.FORUM_COMMENTS,
        [
          Query.equal("postId", postId),
          Query.orderDesc("createdAt")
        ]
      );
      const comments: Comment[] = response.documents.map((doc: any) => ({
        $id: doc.$id,
        content: doc.content,
        userId: doc.userId,
        createdAt: doc.createdAt,
      }));
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.FORUM_POSTS,
        ID.unique(),
        {
          title,
          content,
          createdAt: new Date().toISOString(),
          tags: [],
        }
      );
      setTitle("");
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;

    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.FORUM_COMMENTS,
        ID.unique(),
        {
          postId: selectedPost.$id,
          content: newComment,
          createdAt: new Date().toISOString(),
        }
      );
      setNewComment("");
      fetchComments(selectedPost.$id);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Community Forum</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Share your thoughts..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <Button type="submit">Post</Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.$id}
                className={`cursor-pointer ${
                  selectedPost?.$id === post.$id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedPost(post)}
              >
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(post.createdAt), "PPp")}
                  </p>
                  <p className="mt-2">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {selectedPost && (
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateComment} className="space-y-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
                <Button type="submit">Comment</Button>
              </form>
              <div className="mt-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.$id} className="border-b py-2">
                    <p>{comment.content}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(comment.createdAt), "PPp")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}