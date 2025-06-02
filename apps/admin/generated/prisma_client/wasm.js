
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.1.0
 * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
 */
Prisma.prismaVersion = {
  client: "6.1.0",
  engine: "11f085a2012c0f4778414c8db2651556ee0ef959"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  phone: 'phone',
  firstName: 'firstName',
  lastName: 'lastName',
  role: 'role',
  subRole: 'subRole',
  avatar: 'avatar',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  academyId: 'academyId',
  isOnline: 'isOnline',
  isVerified: 'isVerified',
  age: 'age'
};

exports.Prisma.LoginHistoryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  success: 'success',
  ip: 'ip',
  device: 'device',
  location: 'location',
  browser: 'browser',
  os: 'os',
  createdAt: 'createdAt'
};

exports.Prisma.TwoFactorScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  email: 'email',
  sms: 'sms',
  authenticator: 'authenticator',
  secret: 'secret',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  bio: 'bio',
  phone: 'phone',
  address: 'address',
  preferences: 'preferences'
};

exports.Prisma.UserAcademyCEOScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  academyId: 'academyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AcademyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  logo: 'logo',
  settings: 'settings',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InstructorScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  academyId: 'academyId'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  academyId: 'academyId',
  image: 'image',
  level: 'level',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  status: 'status'
};

exports.Prisma.PathScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  level: 'level',
  completedTasks: 'completedTasks',
  remainingTime: 'remainingTime',
  studyTime: 'studyTime',
  totalTasks: 'totalTasks',
  progress: 'progress',
  engagement: 'engagement',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MilestoneScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  status: 'status',
  pathId: 'pathId',
  createdAt: 'createdAt'
};

exports.Prisma.LessonScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  courseId: 'courseId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FileScalarFieldEnum = {
  id: 'id',
  name: 'name',
  url: 'url',
  type: 'type',
  lessonId: 'lessonId',
  accountingEntryId: 'accountingEntryId',
  prRecordId: 'prRecordId',
  meetingId: 'meetingId',
  adminRoleId: 'adminRoleId',
  legalCaseId: 'legalCaseId',
  createdAt: 'createdAt'
};

exports.Prisma.EnrollmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  progress: 'progress',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuizScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  lessonId: 'lessonId',
  timeLimit: 'timeLimit',
  passingScore: 'passingScore',
  upComing: 'upComing',
  isCompleted: 'isCompleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  text: 'text',
  type: 'type',
  isMultiple: 'isMultiple',
  points: 'points',
  isAnswered: 'isAnswered',
  quizId: 'quizId',
  createdAt: 'createdAt'
};

exports.Prisma.OptionScalarFieldEnum = {
  id: 'id',
  questionId: 'questionId',
  text: 'text',
  isCorrect: 'isCorrect',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubmissionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  quizId: 'quizId',
  answers: 'answers',
  score: 'score',
  feedback: 'feedback',
  passed: 'passed',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AchievementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  value: 'value',
  isNew: 'isNew',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  message: 'message',
  isImportant: 'isImportant',
  urgent: 'urgent',
  title: 'title',
  actionUrl: 'actionUrl',
  read: 'read',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationSettingsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  assignments: 'assignments',
  grades: 'grades',
  messages: 'messages',
  achievements: 'achievements',
  urgent: 'urgent',
  email: 'email',
  push: 'push',
  createdAt: 'createdAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  senderId: 'senderId',
  content: 'content',
  createdAt: 'createdAt',
  isRead: 'isRead'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  content: 'content',
  title: 'title',
  createdAt: 'createdAt',
  likesCount: 'likesCount',
  publicRelationsRecordId: 'publicRelationsRecordId'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.GroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  subject: 'subject',
  image: 'image',
  adminId: 'adminId',
  createdAt: 'createdAt'
};

exports.Prisma.AdminScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.ChannelScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ownerId: 'ownerId',
  prRecordId: 'prRecordId',
  meetingId: 'meetingId',
  adminRoleId: 'adminRoleId',
  legalCaseId: 'legalCaseId',
  createdAt: 'createdAt'
};

exports.Prisma.OwnerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.BookmarkScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  itemId: 'itemId',
  createdAt: 'createdAt'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  startTime: 'startTime',
  endTime: 'endTime',
  academyId: 'academyId',
  prRecordId: 'prRecordId',
  adminRoleId: 'adminRoleId',
  legalCaseId: 'legalCaseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  lessonId: 'lessonId',
  status: 'status',
  method: 'method',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  amount: 'amount',
  legalCaseId: 'legalCaseId',
  createdAt: 'createdAt'
};

exports.Prisma.ReportScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  accountingEntryId: 'accountingEntryId',
  meetingId: 'meetingId',
  adminRoleId: 'adminRoleId',
  legalCaseId: 'legalCaseId',
  createdAt: 'createdAt'
};

exports.Prisma.BadgeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  description: 'description',
  image: 'image',
  points: 'points',
  type: 'type',
  earnedAt: 'earnedAt',
  createdAt: 'createdAt'
};

exports.Prisma.CertificateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  address: 'address',
  phone: 'phone',
  notes: 'notes',
  userId: 'userId',
  title: 'title',
  description: 'description',
  url: 'url',
  image: 'image',
  points: 'points',
  type: 'type',
  earnedAt: 'earnedAt',
  createdAt: 'createdAt'
};

exports.Prisma.CommunityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  image: 'image',
  description: 'description',
  type: 'type',
  likes: 'likes',
  dislikes: 'dislikes',
  views: 'views',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DiscussionScalarFieldEnum = {
  id: 'id',
  communityId: 'communityId',
  postId: 'postId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LiveRoomScalarFieldEnum = {
  id: 'id',
  title: 'title',
  topic: 'topic',
  participants: 'participants',
  isLive: 'isLive',
  isActive: 'isActive',
  isPublic: 'isPublic',
  isPrivate: 'isPrivate',
  isPasswordProtected: 'isPasswordProtected',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  communityId: 'communityId',
  courseId: 'courseId'
};

exports.Prisma.AccountingEntryScalarFieldEnum = {
  id: 'id',
  type: 'type',
  amount: 'amount',
  description: 'description',
  date: 'date',
  createdByAdminId: 'createdByAdminId',
  academyId: 'academyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  invoiceNumber: 'invoiceNumber',
  amount: 'amount',
  description: 'description',
  dueDate: 'dueDate',
  status: 'status',
  accountingEntryId: 'accountingEntryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SalaryPaymentScalarFieldEnum = {
  id: 'id',
  employeeId: 'employeeId',
  amount: 'amount',
  month: 'month',
  year: 'year',
  accountingEntryId: 'accountingEntryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PublicRelationsRecordScalarFieldEnum = {
  id: 'id',
  message: 'message',
  senderName: 'senderName',
  senderContact: 'senderContact',
  status: 'status',
  handledByAdminId: 'handledByAdminId',
  academyId: 'academyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PRResponseScalarFieldEnum = {
  id: 'id',
  response: 'response',
  prRecordId: 'prRecordId',
  respondedByAdminId: 'respondedByAdminId',
  createdAt: 'createdAt'
};

exports.Prisma.MeetingScalarFieldEnum = {
  id: 'id',
  meetingTitle: 'meetingTitle',
  meetingDate: 'meetingDate',
  location: 'location',
  notes: 'notes',
  createdByAdminId: 'createdByAdminId',
  academyId: 'academyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MeetingParticipantScalarFieldEnum = {
  id: 'id',
  meetingId: 'meetingId',
  userId: 'userId',
  isAttended: 'isAttended',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.AdminRoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  adminId: 'adminId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AdminAssignmentScalarFieldEnum = {
  id: 'id',
  adminId: 'adminId',
  roleId: 'roleId',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LegalCaseScalarFieldEnum = {
  id: 'id',
  caseTitle: 'caseTitle',
  caseType: 'caseType',
  status: 'status',
  description: 'description',
  courtDate: 'courtDate',
  assignedLawyerId: 'assignedLawyerId',
  academyId: 'academyId',
  relatedUserId: 'relatedUserId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  STUDENT: 'STUDENT',
  INSTRUCTOR: 'INSTRUCTOR',
  PARENT: 'PARENT',
  ADMIN: 'ADMIN',
  ACADEMY: 'ACADEMY'
};

exports.LoginDevice = exports.$Enums.LoginDevice = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  LAPTOP: 'LAPTOP'
};

exports.CourseStatus = exports.$Enums.CourseStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

exports.MilestoneStatus = exports.$Enums.MilestoneStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  NOT_STARTED: 'NOT_STARTED'
};

exports.LessonStatus = exports.$Enums.LessonStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  NOT_STARTED: 'NOT_STARTED'
};

exports.FileType = exports.$Enums.FileType = {
  VIDEO: 'VIDEO',
  PDF: 'PDF',
  DOCUMENT: 'DOCUMENT',
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  ASSIGNMENT: 'ASSIGNMENT',
  GRADE: 'GRADE',
  MESSAGE: 'MESSAGE',
  ACHIEVEMENT: 'ACHIEVEMENT',
  URGENT: 'URGENT'
};

exports.AccountingType = exports.$Enums.AccountingType = {
  EXPENSE: 'EXPENSE',
  INCOME: 'INCOME',
  SALARY: 'SALARY',
  ADVANCE: 'ADVANCE',
  INVOICE: 'INVOICE'
};

exports.InvoiceStatus = exports.$Enums.InvoiceStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED'
};

exports.PRRequestStatus = exports.$Enums.PRRequestStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED'
};

exports.AdminRoleType = exports.$Enums.AdminRoleType = {
  DIRECTOR: 'DIRECTOR',
  ACCOUNTANT: 'ACCOUNTANT',
  SECRETARY: 'SECRETARY',
  LEGAL_ADVISOR: 'LEGAL_ADVISOR',
  HR_MANAGER: 'HR_MANAGER',
  IT_MANAGER: 'IT_MANAGER',
  GENERAL_MANAGER: 'GENERAL_MANAGER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

exports.LegalCaseType = exports.$Enums.LegalCaseType = {
  CONTRACT: 'CONTRACT',
  DISPUTE: 'DISPUTE',
  INSURANCE: 'INSURANCE',
  EMPLOYMENT: 'EMPLOYMENT',
  INTELLECTUAL_PROPERTY: 'INTELLECTUAL_PROPERTY'
};

exports.LegalCaseStatus = exports.$Enums.LegalCaseStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED',
  PENDING: 'PENDING'
};

exports.Prisma.ModelName = {
  User: 'User',
  LoginHistory: 'LoginHistory',
  TwoFactor: 'TwoFactor',
  Profile: 'Profile',
  UserAcademyCEO: 'UserAcademyCEO',
  Academy: 'Academy',
  Instructor: 'Instructor',
  Course: 'Course',
  Path: 'Path',
  Milestone: 'Milestone',
  Lesson: 'Lesson',
  File: 'File',
  Enrollment: 'Enrollment',
  Quiz: 'Quiz',
  Question: 'Question',
  Option: 'Option',
  Submission: 'Submission',
  Achievement: 'Achievement',
  Notification: 'Notification',
  NotificationSettings: 'NotificationSettings',
  Message: 'Message',
  Post: 'Post',
  Comment: 'Comment',
  Group: 'Group',
  Admin: 'Admin',
  Channel: 'Channel',
  Owner: 'Owner',
  Bookmark: 'Bookmark',
  Event: 'Event',
  Attendance: 'Attendance',
  Payment: 'Payment',
  Report: 'Report',
  Badge: 'Badge',
  Certificate: 'Certificate',
  Community: 'Community',
  Discussion: 'Discussion',
  LiveRoom: 'LiveRoom',
  AccountingEntry: 'AccountingEntry',
  Invoice: 'Invoice',
  SalaryPayment: 'SalaryPayment',
  PublicRelationsRecord: 'PublicRelationsRecord',
  PRResponse: 'PRResponse',
  Meeting: 'Meeting',
  MeetingParticipant: 'MeetingParticipant',
  Permission: 'Permission',
  AdminRole: 'AdminRole',
  AdminAssignment: 'AdminAssignment',
  LegalCase: 'LegalCase'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
