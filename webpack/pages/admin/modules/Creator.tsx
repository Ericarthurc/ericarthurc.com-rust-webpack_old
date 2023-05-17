import axios from "axios";
import { Component, createSignal, Index } from "solid-js";
import { createPost } from "../api/admin";

import { IPost } from "../api/types";
import { timeFormatISO, timeFormatYYYYMMDD } from "../utils/dateFormater";
import { addCategory, removeCategory, updatePostField } from "./formUpdater";

interface IProps {
  fetchPostsHandler: () => Promise<void>;
}

const Creator: Component<IProps> = (props) => {
  const [newPost, setNewPost] = createSignal<IPost>({
    id: "",
    date: new Date().toISOString(),
    slug: "",
    title: "",
    series: "",
    categories: [],
    markdown: "",
    post_snippet: "",
    series_snippet: "",
    published: false,
    featured: false,
    created_at: "",
    updated_at: "",
  });

  // NEEDS VALIDATION AND ERROR HANDLING
  // Handle what happens after a post is created
  // // maybe close the creator panel and go back to home?
  // // maybe switch to the update view of that new post?
  const createPostHandler = async () => {
    try {
      await createPost({ ...newPost() });
      props.fetchPostsHandler();
    } catch (error) {}
  };

  return (
    <>
      <div class="admin-panel-editor-header">
        <h3>New Post</h3>
      </div>
      <div class="admin-panel-editor-form">
        <label class="admin-panel-editor-form-label" for="title">
          Title:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="title"
          type="text"
          onInput={updatePostField(setNewPost, "title")}
          value={newPost().title}
        ></input>
        <label class="admin-panel-editor-form-label" for="slug">
          Slug:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="slug"
          type="text"
          onInput={updatePostField(setNewPost, "slug")}
          value={newPost().slug}
        ></input>
        <div class="admin-panel-editor-form-published">
          <label class="admin-panel-editor-form-label" for="published">
            Published:
          </label>
          <input
            class="admin-panel-editor-form-checkbox"
            id="published"
            type="checkbox"
            onInput={updatePostField(setNewPost, "published")}
            checked={newPost().published}
          ></input>
        </div>
        <div class="admin-panel-editor-form-published">
          <label class="admin-panel-editor-form-label" for="featured">
            Featured:
          </label>
          <input
            class="admin-panel-editor-form-checkbox"
            id="featured"
            type="checkbox"
            onInput={updatePostField(setNewPost, "featured")}
            checked={newPost().featured}
          ></input>
        </div>
        <label class="admin-panel-editor-form-label" for="date">
          Date:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="date"
          type="date"
          onInput={updatePostField(setNewPost, "date")}
          value={timeFormatYYYYMMDD(newPost().date)}
        ></input>
        <label class="admin-panel-editor-form-label" for="series">
          Series:
        </label>
        <input
          class="admin-panel-editor-form-input"
          type="series"
          onInput={updatePostField(setNewPost, "series")}
          value={newPost().series}
        ></input>
        <label class="admin-panel-editor-form-label" for="categories">
          Categories:
        </label>
        <Index each={newPost().categories}>
          {(c, i) => (
            <div class="admin-panel-editor-form-category">
              <input
                class="admin-panel-editor-form-input"
                id="categories"
                type="text"
                onInput={updatePostField(setNewPost, "categories", i)}
                value={c()}
              ></input>
              <button
                class="admin-panel-editor-form-category-button remove"
                onClick={removeCategory(setNewPost, i)}
              >
                <svg
                  class="admin-panel-editor-form-category-button-svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 188 188"
                  version="1.1"
                  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                >
                  <path
                    d="M142.467,93.967l-97,0"
                    style="fill:none;stroke:#fff;stroke-width:16.67px;"
                  />
                </svg>
              </button>
            </div>
          )}
        </Index>
        <div class="admin-panel-editor-form-category-adder">
          <button
            class="admin-panel-editor-form-category-button add"
            onClick={() => addCategory(setNewPost)}
          >
            <svg
              class="admin-panel-editor-form-category-button-svg"
              width="100%"
              height="100%"
              viewBox="0 0 114 114"
              version="1.1"
              style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
            >
              <path
                d="M56.833,8.333l0,97"
                style="fill:none;stroke:#fff;stroke-width:16.67px;"
              />
              <path
                d="M105.333,56.833l-97,0"
                style="fill:none;stroke:#fff;stroke-width:16.67px;"
              />
            </svg>
          </button>
        </div>
        <label class="admin-panel-editor-form-label" for="post_snippet">
          Post Snippet:
        </label>
        <textarea
          class="admin-panel-editor-form-textarea"
          id="post_snippet"
          onInput={updatePostField(setNewPost, "post_snippet")}
          value={newPost().post_snippet}
        ></textarea>
        <label class="admin-panel-editor-form-label" for="markdown">
          Markdown:
        </label>
        <textarea
          class="admin-panel-editor-form-textarea"
          id="markdown"
          onInput={updatePostField(setNewPost, "markdown")}
          value={newPost().markdown}
        ></textarea>
        <button
          class="admin-panel-editor-form-button create"
          onClick={createPostHandler}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default Creator;
