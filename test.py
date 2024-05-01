import tkinter as tk
from tkinter import filedialog
import cv2
from PIL import Image, ImageTk

class VideoPlayer:
    def __init__(self, master):
        self.master = master
        self.master.title("Simple Video Player")

        self.video_path = ""
        self.video_label = tk.Label(master)
        self.video_label.pack()

        control_frame = tk.Frame(master)
        control_frame.pack()

        self.play_button = tk.Button(control_frame, text="Play", command=self.play_video)
        self.play_button.grid(row=0, column=0, padx=5, pady=5)

        self.pause_button = tk.Button(control_frame, text="Pause", command=self.pause_video, state=tk.DISABLED)
        self.pause_button.grid(row=0, column=1, padx=5, pady=5)

        self.stop_button = tk.Button(control_frame, text="Stop", command=self.stop_video, state=tk.DISABLED)
        self.stop_button.grid(row=0, column=2, padx=5, pady=5)

        self.select_button = tk.Button(control_frame, text="Select Video", command=self.select_video)
        self.select_button.grid(row=0, column=3, padx=5, pady=5)

        self.cap = None
        self.is_playing = False

    def select_video(self):
        self.video_path = filedialog.askopenfilename()
        if self.video_path:
            self.cap = cv2.VideoCapture(self.video_path)
            self.play_video()

    def play_video(self):
        if self.cap and not self.is_playing:
            self.is_playing = True
            self.pause_button.config(state=tk.NORMAL)
            self.stop_button.config(state=tk.NORMAL)
            self.play_button.config(state=tk.DISABLED)
            self.video_loop()

    def pause_video(self):
        self.is_playing = False
        self.play_button.config(state=tk.NORMAL)
        self.pause_button.config(state=tk.DISABLED)

    def stop_video(self):
        self.is_playing = False
        self.cap.release()
        self.video_label.config(image="")
        self.play_button.config(state=tk.NORMAL)
        self.pause_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.DISABLED)

    def video_loop(self):
        if self.is_playing:
            ret, frame = self.cap.read()
            if ret:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frame = Image.fromarray(frame)
                frame = ImageTk.PhotoImage(frame)
                self.video_label.configure(image=frame)
                self.video_label.image = frame
                self.master.after(10, self.video_loop)
            else:
                self.stop_video()

root = tk.Tk()
app = VideoPlayer(root)
root.mainloop()
