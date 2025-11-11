import {
  Component,
  input,
  output,
  signal,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonIcon,
  IonProgressBar,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonSpinner,
  IonChip,
  IonAlert,
  IonActionSheet,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'done' | 'error' | 'removed';
  percent?: number;
  url?: string;
  thumbUrl?: string;
  response?: any;
  error?: any;
  file?: File;
  path?: string;
}

export interface UploadChange {
  file: UploadFile;
  fileList: UploadFile[];
  type: 'added' | 'removed' | 'progress' | 'success' | 'error';
}

@Component({
  selector: 'input-upload-file',
  templateUrl: './input-upload-file.component.html',
  styleUrls: ['./input-upload-file.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonProgressBar,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    IonSpinner,
    IonAlert,
    IonActionSheet,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    CommonModule,
  ],
})
export class UploadFileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Inputs
  accept = input<string>('image/*,video/*,.pdf,.doc,.docx');
  multiple = input<boolean>(true);
  maxCount = input<number>(10);
  maxSize = input<number>(10 * 1024 * 1024); // 10MB
  disabled = input<boolean>(false);
  listType = input<'text' | 'picture' | 'picture-card'>('text');
  showUploadList = input<boolean>(true);
  buttonText = input<string>('آپلود فایل');
  capture = input<'camera' | 'gallery' | 'both'>('both');

  // Outputs
  change = output<UploadChange>();
  fileAdded = output<UploadFile>();
  fileRemoved = output<UploadFile>();
  uploadSuccess = output<UploadFile>();
  uploadError = output<UploadFile>();

  // Signals
  fileList = signal<UploadFile[]>([]);
  isActionSheetOpen = signal(false);
  isAlertOpen = signal(false);
  alertMessage = signal('');

  buttons = [
    {
      text: 'دوربین',
      icon: 'camera',
      handler: () => {
        this.takePhoto();
      },
    },
    {
      text: 'گالری',
      icon: 'images',
      handler: () => {
        this.selectFromGallery();
      },
    },
    {
      text: 'فایل‌های دستگاه',
      icon: 'folder',
      handler: () => {
        this.openFilePicker();
      },
    },
    {
      text: 'انصراف',
      role: 'cancel',
    },
  ];

  ngOnInit() {}

  // باز کردن Action Sheet برای انتخاب منبع
  async openUploadOptions() {
    if (this.disabled()) return;

    if (this.capture() === 'both') {
      this.isActionSheetOpen.set(true);
    } else if (this.capture() === 'camera') {
      this.takePhoto();
    } else {
      this.selectFromGallery();
    }
  }

  // گرفتن عکس با دوربین
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: true,
      });

      if (image.webPath) {
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        const file = new File([blob], `photo_${Date.now()}.jpg`, {
          type: 'image/jpeg',
        });
        this.handleFileSelection([file]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      this.showAlert('خطا در گرفتن عکس');
    }
  }

  // انتخاب از گالری
  async selectFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      if (image.webPath) {
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        const file = new File([blob], `gallery_${Date.now()}.jpg`, {
          type: 'image/jpeg',
        });
        this.handleFileSelection([file]);
      }
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      this.showAlert('خطا در انتخاب از گالری');
    }
  }

  // انتخاب فایل معمولی
  openFilePicker() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.handleFileSelection(Array.from(files));
    event.target.value = ''; // Reset input
  }

  handleFileSelection(files: File[]) {
    if (this.disabled()) return;

    const currentCount = this.fileList().length;
    const remainingSlots = this.maxCount() - currentCount;

    if (remainingSlots <= 0) {
      this.showAlert(`حداکثر ${this.maxCount()} فایل قابل آپلود است`);
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (file.size > this.maxSize()) {
        this.showAlert(`حجم فایل ${file.name} بیش از حد مجاز است`);
        return;
      }

      const uploadFile: UploadFile = {
        uid: this.generateUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        percent: 0,
        file: file,
      };

      this.fileList.update((list) => [...list, uploadFile]);

      this.fileAdded.emit(uploadFile);
      this.change.emit({
        file: uploadFile,
        fileList: this.fileList(),
        type: 'added',
      });

      this.simulateUpload(uploadFile);
    });
  }

  // شبیه‌سازی آپلود (در پروژه واقعی باید با API جایگزین شود)
  private simulateUpload(file: UploadFile) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        this.fileList.update((list) =>
          list.map((f) =>
            f.uid === file.uid
              ? {
                  ...f,
                  status: 'done',
                  percent: 100,
                  url: URL.createObjectURL(f.file!),
                  thumbUrl: f.type.startsWith('image/')
                    ? URL.createObjectURL(f.file!)
                    : undefined,
                }
              : f
          )
        );

        const updatedFile = this.fileList().find((f) => f.uid === file.uid)!;
        this.uploadSuccess.emit(updatedFile);
        this.change.emit({
          file: updatedFile,
          fileList: this.fileList(),
          type: 'success',
        });
      } else {
        this.fileList.update((list) =>
          list.map((f) =>
            f.uid === file.uid ? { ...f, percent: progress } : f
          )
        );

        this.change.emit({
          file: { ...file, percent: progress },
          fileList: this.fileList(),
          type: 'progress',
        });
      }
    }, 200);
  }

  removeFile(file: UploadFile) {
    this.fileList.update((list) => list.filter((f) => f.uid !== file.uid));

    this.fileRemoved.emit(file);
    this.change.emit({
      file: file,
      fileList: this.fileList(),
      type: 'removed',
    });

    // Clean up URLs
    if (file.url) URL.revokeObjectURL(file.url);
    if (file.thumbUrl) URL.revokeObjectURL(file.thumbUrl);
  }

  retryUpload(file: UploadFile) {
    this.fileList.update((list) =>
      list.map((f) =>
        f.uid === file.uid
          ? { ...f, status: 'uploading', percent: 0, error: undefined }
          : f
      )
    );

    this.simulateUpload(file);
  }

  private generateUID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private showAlert(message: string) {
    this.alertMessage.set(message);
    this.isAlertOpen.set(true);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileIcon(type: string): string {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'videocam';
    if (type.includes('pdf')) return 'document';
    if (type.includes('word') || type.includes('document')) return 'document';
    return 'document';
  }
}
