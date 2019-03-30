;; M-: (hack-dir-local-variables-non-file-buffer) to reload =.dir-locals.el=

((nil . (
	 (org-image-actual-width . nil)
	 (eval . (add-to-list 'ido-ignore-files "\.html|pdf|mp3"))
         (eval . (setq coil-project-alist '(:src "~/workspace/xinhuang.github.com"
					    :dst "~/workspace/xinhuang.github.com/dist"
					    :theme "github"
					    :exclude ("themes")
					    :root "posts")))
	 (org-publish-project-alist . (("blog"
       					:components ("blog-pages" "blog-assets"))
       				       ("blog-pages"
       					:base-directory "~/workspace/xinhuang.github.com"
			                :publishing-directory "~/workspace/xinhuang.github.com/dist"
			                :recursive t
       					:publishing-function org-html-publish-to-html
       					:author "Xin Huang"
       					:headline-levels 4
       					:auto-preamble t
					:html-postamble "<a href=\"/\" class=\"left\">Home</a><a href=\"\#\" class=\"right\">Top</a>"
       					:auto-sitemap nil
       					:completion-function coil-publish-complete-index)
				       ("blog-assets"
					:base-directory "."
					:base-extension "css\\|js\\|png\\|jpg\\|gif\\|pdf"
					:publishing-directory "dist"
					:recursive t
					:publishing-function org-publish-attachment))))))

;; org project
;; (setq org-publish-project-alist
;;       `(("org"
;; 	 :components("org-pages"))
;; 	("org-pages"
;; 	 :base-directory ,project-dir
;; 	 :base-extension "org"
;; 	 :publishing-directory ,publish-dir
;; 	 :recursive t
;; 	 :publishing-function org-html-publish-to-html
;; 	 :author "Xin Huang"
;; 	 :headline-levels 4
;; 	 :auto-preamble t
;; 	 :auto-sitemap t
;; 	 :completion-function coil-publish-complete-index
;; 	 )))
;;	("org-assets"
;;	 :base-directory "."
;;	 :base-extension "css\\|js\\|png\\|jpg\\|gif\\|pdf\\|mp3\\|ogg\\|swf"
;;	 :publishing-directory ,publish-dir
;;	 :recursive t
;;	 :publishing-function org-publish-attachment)
;;	))
