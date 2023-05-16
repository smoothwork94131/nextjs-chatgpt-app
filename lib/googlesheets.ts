import { google } from 'googleapis';
export async function getEmojiList() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      'sheet-api-service-account@igfitchatbot.iam.gserviceaccount.com',
      undefined,
      ('-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9LgBbdEb0xt9O\n47rlxbKf+w4dF6zJhR7u3zraMlAylaLkSWOIYlqmZ9L/31ev8jVvnNINfJQlrzkM\nhavyFxgniqUJa3gMTArWNbP3bkjZ+N4AW3qkpLMeAFQyuPiS8RIyj0+DDssOS+QM\n7LObkUGmxQsZQBJANcTd7pPJAKeNTlAO+1APhh71Ov4wjgFidU+LonnMyAkSW8J+\n6bYvjDx56kr4XFfybrw6U5Vo9Jb5ChZncL0Wid/FMV6GJqN47MTHEAPPlHXJIX5d\ndxhY1tUTVwWydJvcg8LvuMtrwEGDzYAcZlf1q8utSbFvbxKe2YlCU0ioG8Krad0l\nPNMyCDqDAgMBAAECggEAXo4iDpP5LTpDfiZUEal1RQISRVdCfT0Ev4ci3tF8BTSG\nhMzrq0zhmz/UliCXLvGEZOOAl84XLBi/DnO3hBqn74ecQq+NArR1TCjuaTMdxZje\nuVX/4FAT2OB4NRv/3k4Q9uVrbAmWU3B6LT2X7h81rbnZ+MZt+NsHKZgoFLS3imfm\nWYq+BM4eVMMIuNjPHm8HHQxKuLKb27E+P6YM7yC1TowifMh7uAzwBLZPKUWURmza\nw3CG/OEJUY5cNvRU4g1mqEwBZ8QrngStF/f0uIyZ1lo/bbbzwBk5M0K0oF4iWhTf\nXubDlqjRL7t5x2uWMLfPjWHZ8kU4Ro3aX/e9cNKoWQKBgQD9/g8Dd+/26IDcx5we\nsQ7ISAhZNInxxEr6KeMGaZsjBotdLPFepxtkylf8mHT4pmemerEqeJLtYy433r/m\nYkUgFJdvyHkxwGV7V4UJqsZYP/gsosPfdSfWgg1XDTcklkpRROu1pZzHIO/U9/0J\nnU8lVLHcn3XedIPXtW28Gee7+QKBgQC+rMwelFuXg/sdR8/YtAR4XByExUN5rU0i\n32CErbajVD8/4PT3sB0VbMCmxZcoWAapjVZrUJ7zFOPdTS6KXVRszQ2kA//VzXQZ\nVqk1wZCYj/Se9IuJIaa2jNxx/y0GNwpXFIvZ4TQ/M4WOXqMTMNijavLfscvBhjvk\nSzCSCQvxWwKBgQD1ZnprB366OHoI1nNo0/lMWQx34+NDzDwE6GOI1pAljzUnmTy8\nDwjQoQ/R5hteAqkymGiEeGq9IY6OPJF8roXLMRn/ztoJz7I9MZpAdNeefG/z8G7/\nf9o1zwHEkegtWWgEjWqP3qtTWedfBRteJrdJgkM2vnrLrBeWWpzjmMPlQQKBgD3s\nmI4F2Ikoj9E+lT3nmNwN7iUge310zuxYZ1wvnnUE01XHlUcrpwZiP17qJOExVViT\nUlGf6T9AtZAVlNvS26xKG/f8ZIXnJ6FjB6kxp+gkOGm3OenbR+1Zae6L1O+DyJPn\nVFP6U6GC9gj6qzN8VZ8dCKulbmr3UVQfJzMGRR6pAoGANNfkFcXXPWg5X1r4S8Er\n8vs7N+blpeDanuMFOv23Ceac6FZHx0DSr+WyMzjVAwCKwwAN36EtOsd5SXofk7dB\nDK6S8NbxvLkRR/kOOyU3D/JEWqWTCOBd04cBOBEpuficUWGeH0Um1CJYDrx4lBOu\n644y+AQzTRmq6NJFcearR3c=\n-----END PRIVATE KEY-----\n' || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1gZE3k2_JWsZL0g9Y88qT_SmVtleZosLpD_T8PNjerK4',
      range: 'Sheet1', // sheet name
    });

    const rows = response.data.values;
  

    if (rows) {
      return rows;
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}