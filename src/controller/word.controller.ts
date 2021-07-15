import { Request, Response } from 'express';
import { get } from 'lodash';
import { createWord, findWord, findAndUpdate, deleteWord } from '../service/word.service';
import Word from '../model/word.model';

export async function createWordHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const body = req.body;
  const word = await createWord({...body, user: userId});

  return res.send(word);
}

export async function updateWordHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const wordId = get(req, 'params.wordid');
  const update = req.body;
  const word = await findWord({ wordId });
  if (!word) {
    return res.sendStatus(404);
  }

  // @ts-ignore
  if(String(word.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedWord = await findAndUpdate({ wordId }, update, {new: true});
  return res.send(updatedWord);
}

export async function deleteWordHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const wordId = get(req.body, 'params.wordid');
  const word = await findWord({ wordId });
  
  if (!word) {
    return res.sendStatus(404);
  }

  // @ts-ignore
  if(String(word.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteWord({ wordId });

  return res.sendStatus(200);
}

export async function getWordsHandler(req: Request, res: Response) {
  const wordId = get(req, 'params.wordid');

  if (wordId) {
    const word = await findWord({ _id: wordId }); 

    if (!word) {
      return res.sendStatus(404);
    }
  
    return res.send(word);
  } else {
    const words = await Word.find({});

    if(!words) {
      return res.sendStatus(404);
    }

    return res.send(words);
  }
}