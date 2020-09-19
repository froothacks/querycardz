import string

import gensim.downloader as api
from gensim.parsing.preprocessing import remove_stopwords

wv = api.load('word2vec-google-news-300')
# print("hello")
# # for i, word in enumerate(wv.vocab):
# #     if i == 10:
# #         break
# #     print(word)
# vec_king = wv['king']
# print(vec_king)
# pairs = [
#     ('car', 'minivan'),  # a minivan is a kind of car
#     ('car', 'bicycle'),  # still a wheeled vehicle
#     ('car', 'airplane'),  # ok, no wheels, but still a vehicle
#     ('car', 'cereal'),  # ... and so on
#     ('car', 'communism'),
#     ('mitosis', 'biology'),
#     ('mitosis', 'physics'),
#     ('mitosis', 'chemistry'),
#     ('mitosis', 'history'),
#     # ('what is mitosis', 'biology')
# ]
# for w1, w2 in pairs:
#     print('%r\t%r\t%.2f' % (w1, w2, wv.similarity(w1, w2)))

allTopics = ["biology", "physics", "chemistry", "history", "math", "economics"]


def getTopics(question, answer):
    table = str.maketrans(dict.fromkeys(string.punctuation))  # OR {key: None for key in string.punctuation}
    new_q = question.translate(table)
    new_a = answer.translate(table)
    # print("q", new_q)
    # print("a", new_a)
    # print("astop", remove_stopwords(new_a))
    questionClean = remove_stopwords(new_q).lower().split()
    answerClean = remove_stopwords(new_a).lower().split()
    allWords = questionClean + answerClean
    # print("allWords", allWords)
    maxScore = 0
    maxTopic = ""
    maxWord = ""
    maxTopicScores = {topic: (0, "") for topic in allTopics}
    for topic in allTopics:
        for word in allWords:
            try:
                curScore = wv.similarity(word, topic)
            except KeyError:
                curScore = 0
            if curScore > maxScore:
                maxScore = curScore
                maxTopic = topic
                maxWord = word
            if maxTopicScores[topic][0] < curScore:
                maxTopicScores[topic] = (curScore, word)
    print(maxTopicScores)
    if maxScore > 0.15:
        print("maxscore", maxScore, maxWord)
        return [maxTopic]
    print("maxscore", maxScore, maxWord)
    return []


if __name__ == "__main__":
    while True:
        # input1 = input("enter word 1:")
        # input2 = input("enter word 2:")
        # print('%r\t%r\t%.2f' % (input1, input2, wv.similarity(input1, input2)))
        question = input("enter question: ")
        answer = input("enter answer: ")
        print(getTopics(question, answer))
